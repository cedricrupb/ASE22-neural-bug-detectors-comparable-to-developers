from dataclasses import dataclass

from typing import Iterable


@dataclass
class GraphGeneratorConfig:
    analysis_phases  : Iterable[str] = ("ast", "cfg", "dataflow")
    onlytokens       : bool          = False
    edge_types       : Iterable[str] = ("next_token", "child", "sibling", 
                                        "controlflow", "return_from",
                                        "next_may_use", "last_may_write",
                                        "assigned_from")
    invert_edges     : bool          = False


@dataclass
class TokenizerConfiguration:
    vocabulary_path : str

    add_special_tokens : bool = True

    # BPE config
    bpe_encoding : bool = True
    bpe_alignment : str = "scatter" # Options: scatter, sequence
    bpe_cutoff : int = 10    # Only if bpe_alignment = scatter
    bpe_eot    : str = "#"

    # Pre tokenization
    lang : str = "java"
    ignore_syntax_errors : bool = True
    str_cutoff : int = -1

    target_vocab_path : str = None

    # Graph preprocessing
    construct_graph  : bool                 = False
    graph_config     : GraphGeneratorConfig = None
    
    def __post_init__(self):
        if self.construct_graph and self.graph_config is None:
            self.graph_config = GraphGeneratorConfig()