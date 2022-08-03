
import torch
from torch import nn
from torch.nn import functional as F

from torch_scatter import scatter

from dataclasses import dataclass

@dataclass
class GraphNeuralNetworkConfig:
    graph_encoder_type  : str = "residual"
    num_edge_types      : int = 1
    embedding_size      : int = 256
    hidden_size         : int = 256
    dropout_rate        : float = 0.0
    max_length          : int = 512
    pad_token_id        : int = 0

    def copy_from_nbfconfig(self, nbf_config):
        self.embedding_size = nbf_config.embedding_size
        self.hidden_size    = nbf_config.hidden_size
        self.max_length     = nbf_config.max_sequence_length
        self.pad_token_id   = nbf_config.pad_token_id

        tokenizer_config = nbf_config.tokenizer_config
        
        assert tokenizer_config.construct_graph, \
            "Graph neural network expect that a graph is constructed during preprocessing"
        
        graph_config = tokenizer_config.graph_config
        self.num_edge_types = len(graph_config.edge_types)

        if graph_config.invert_edges:
            self.num_edge_types *= 2


# Predefined model size --------------------------------

def config_from_model_size(model_size):

    if model_size == "small":
        return GraphNeuralNetworkConfig(
            embedding_size = 256,
            hidden_size    = 256,
            dropout_rate   = 0.2,
        )

    raise ValueError("Unknown model size: %s" % model_size)


# NBF model -----------------------------------------------------

class GraphNeuralNetworkNBF(nn.Module):
    
    def __init__(self, config, embeddings, prediction_head):
        super().__init__()
        self.config = config
        
        self.encoder = graph_encoder_by_type(
            self.config.graph_encoder_type
        )(config, embeddings)

        self.prediction_head = prediction_head

    def increase_token_length(self, max_length):
        pass # There is no length limit

    def forward(self, 
                input_ids,
                typed_edges,
                input_mask = None,
                position_ids = None,
                location_index = None,
                location_mask  = None,
                repair_mask   = None,
                repair_target = None,
                graph_index  = None,
                preorder_traversal  = None):

        hidden, target_embed = self.encoder(input_ids, 
                                            typed_edges,
                                            input_mask, 
                                            position_ids)

        if graph_index is not None:
            # We are in batch mode and need to reshape inputs!
            (hidden,
                target_embed,
                input_mask,
                location_mask,
                repair_mask,
                repair_target) = convert_graphs_to_batches(
                graph_index, hidden, target_embed,
                input_mask, location_mask, repair_mask,
                repair_target
            )

        return self.prediction_head(
            hidden,
            target_embed,
            input_mask     = input_mask,
            location_index = location_index,
            location_mask  = location_mask,
            repair_mask    = repair_mask,
            repair_target  = repair_target
        )


# Implementation ------------------------------------------------

def graph_encoder_by_type(graph_encoder_type):

    if graph_encoder_type == "residual":
        return ResidualGNNEncoder
    
    raise ValueError("Unknown graph encoder: %s" % graph_encoder_type)


# GNN used in Allamanis'22

class GNNSequential(nn.ModuleList):

    def __init__(self, *layers):
        super().__init__(layers)
        self.num_layers = len(layers)

    def forward(self, state_embedding, typed_edges):
        for ix in range(self.num_layers):
            state_embedding = self[ix](state_embedding, typed_edges)
        return state_embedding


class ResidualGNNMessagePassing(nn.Module):

    def __init__(self, hidden_size, num_edges):
        super().__init__()
        self.num_edges = num_edges

        self.edge_linears = nn.ModuleList([
            nn.Linear(2 * hidden_size, hidden_size, bias = False)
            for _ in range(num_edges)
        ])


    def message(self, edge_type_id, state_embedding, source, target):
        edge_linear_fn = self.edge_linears[edge_type_id]

        source_states = F.embedding(source, state_embedding)
        target_states = F.embedding(target, state_embedding)
        edge_states   = torch.cat([source_states, target_states], dim=1)
        return edge_linear_fn(edge_states)

        
    def forward(self, state_embedding, typed_edges):

        all_messages        = []
        all_message_targets = []

        for edge_type_id in range(1, self.num_edges + 1):
            edge_mask  = typed_edges[0,  :] == edge_type_id
            source, targets = typed_edges[1, :], typed_edges[2, :]
            source, targets = source[edge_mask], targets[edge_mask]
            
            per_edge_result = self.message(
                edge_type_id - 1,
                state_embedding,
                source,
                targets
            )

            all_message_targets.append(targets)
            all_messages.append(per_edge_result)
        
        all_message_targets = torch.cat(all_message_targets, dim=0)
        all_messages = torch.cat(all_messages, dim = 0)

        return scatter(
            all_messages,
            index    = all_message_targets,
            dim      = 0,
            dim_size = state_embedding.shape[0]
        )


class ResidualGNNLayer(nn.Module):

    def __init__(self, hidden_size, output_size, num_edges, dropout_rate = 0.0):
        super().__init__()

        self.mp_module = ResidualGNNMessagePassing(
            hidden_size, num_edges
        )

        dense_layer = nn.Linear(hidden_size, output_size)
        nn.init.xavier_uniform_(dense_layer.weight)

        self.state_update = nn.Sequential(
            nn.GELU(),
            nn.LayerNorm(hidden_size),
            dense_layer,
            nn.Tanh(),
            nn.Dropout(p=dropout_rate)
        )

    def forward(self, state_embedding, typed_edges):
        messages = self.mp_module(state_embedding, typed_edges)
        return self.state_update(messages)


class ResidualGNNConcatLayer(nn.Module):

    def __init__(self, input_size, hidden_size, num_layers, num_edges, dropout_rate = 0.0):
        super().__init__()

        gnn_layers = []
        current_input_size = input_size
        for _ in range(num_layers - 1):
            gnn_layers.append(
                ResidualGNNLayer(current_input_size, hidden_size, num_edges, dropout_rate)
            )
            current_input_size = hidden_size

        self.gnn_layers = GNNSequential(*gnn_layers)
        self.output_gnn = ResidualGNNLayer(
            input_size + current_input_size, hidden_size, num_edges, dropout_rate
        )

    def forward(self, state_embedding, typed_edges):
        gnn_hidden = self.gnn_layers(state_embedding, typed_edges)
        residual   = torch.cat([state_embedding, gnn_hidden], dim = 1)
        return self.output_gnn(residual, typed_edges)


class ResidualGNNEncoder(nn.Module):

    def __init__(self, config, embeddings):
        super().__init__()
        self.config = config
        self.embeddings = embeddings

        num_edges = config.num_edge_types
        
        self.gnn_layers = GNNSequential(
            ResidualGNNConcatLayer(
                config.embedding_size,
                config.hidden_size,
                num_layers = 4,
                num_edges = num_edges,
                dropout_rate = config.dropout_rate,
            ),
            ResidualGNNConcatLayer(
                config.embedding_size,
                config.hidden_size,
                num_layers = 4,
                num_edges = num_edges,
                dropout_rate = config.dropout_rate,
            )
        )

    def forward(self, input_ids, typed_edges, input_mask = None, position_ids = None):
        input_ids, typed_edges = input_ids.squeeze(0), typed_edges.squeeze(0)

        input_embed = self.embeddings(input_ids)
        hidden      = self.gnn_layers(input_embed, typed_edges)

        return hidden, input_embed


# Convert to classical batches --------------------------------

def convert_graphs_to_batches(graph_index, *node_tensors):

    with torch.no_grad():
        # Index magic: [(graph x nodes), dim] -> [graph, nodes, dim]

        batch_dim = graph_index.max() + 1
        _, node_counts = torch.unique_consecutive(graph_index, return_counts = True)
        node_dim  = node_counts.max()

        batch_mask = torch.zeros((batch_dim, node_dim))
        for ix, node_count in enumerate(node_counts):
            batch_mask[ix, :node_count] = 1
        
        batch_mask = batch_mask.bool().to(graph_index.device)

    result = tuple()

    for node_tensor in node_tensors:
        if node_tensor is None: result += (None,); continue

        if node_tensor.shape[0] == batch_dim:
            # Already in correct form
            result += (node_tensor,)
            continue
        
        output = torch.zeros((batch_dim, node_dim) + node_tensor.shape[1:], 
                                dtype=node_tensor.dtype, device = node_tensor.device)
        
        output[batch_mask] = node_tensor
        result += (output,)

    return result
