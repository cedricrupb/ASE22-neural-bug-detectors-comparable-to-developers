
from .visitor import ASTVisitor


class TokenizationConfig:
    """Helper object to translate arguments of tokenize to config object"""

    def __init__(self, lang, **kwargs):
        self.lang = lang
        self.syntax_error = "raise" # Options: raise, warn, ignore

        self.indent_tokens = False # Whether to represent indentations and newlines (Helpful for script languages like Python)
        self.num_whitespaces_for_indent = 4

        # A list of all statement node defined in the language
        self.statement_types = [
            "*_statement", "*_definition", "*_declaration"
        ]

        self.visitors = [LeafVisitor] # visitor classes which should be run during analysis

        self.update(kwargs)

    
    def update(self, kwargs):
        for k, v in kwargs.items():

            if k not in self.__dict__:
                raise TypeError("TypeError: tokenize() got an unexpected keyword argument '%s'" % k)
        
            self.__dict__[k] = v
    
    def __repr__(self):

        elements = []
        for k, v in self.__dict__.items():
            if v is not None:
                elements.append("%s=%s" % (k, v))
        
        return "Config(%s)" % ", ".join(elements)


# Java config --------------------------------

def create_tokenization_config():
    return TokenizationConfig(
        lang = 'java',
        statement_types = ["*_statement", "*_definition", "*_declaration"],
        indent_tokens   = False
    )

# Basic visitor -----------------------------------------------------------

class LeafVisitor(ASTVisitor):

    def __init__(self, node_handler):
        self.node_handler = node_handler

    def visit_string(self, node):
        self.node_handler(node)
        return False

    def visit(self, node):
        if node.child_count == 0:
            self.node_handler(node)
            return False





