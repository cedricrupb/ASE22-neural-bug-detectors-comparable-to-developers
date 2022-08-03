# Evaluation of neural bug detectors
In this study, we employ two neural bug detectors based on graph neural networks and transformer models. These models are trained to identify artificial [contextual mutants](https://doi.org/10.1109/ICST53961.2022.00027). The datasets and training scripts are available on [Zenodo](https://zenodo.org/record/5547824). 
Here, we describe how the evaluated bug detectors can be used to replicate our evaluation or reuse the bug detectors in other context.

## Quick start: Python API
If you like to use the bug detectors in your own projects, you can easily
access them via the Python API:
```python
from nbfbaselines import NBFModel

detector = NBFModel.from_pretrained("gnn-study-java")

detector("""

public int add(int x, int y){
    return x + x;
}

""")

# Output:
# [{'text': 'public int add ( int x , int y ) {\n     return x + y ;\n }',
#  'before': 'x',
#  'after': 'y',
#  'prob': 1.0}]

```
Note that this script will download multiple files (bug detector definition and Java parsing definitions). For the artifact, these files are already downloaded in the virtual machine and therefore archieved. Further, note that the bug detector (as described in the paper) also proposes a repair which we ignored in the paper. To decide which line was fixed by the tool, we employ [code_diff](https://github.com/cedricrupb/code_diff):
```python
import code_diff

buggy_code = """

public int add(int x, int y){
    return x + x;
}

"""

fixed_code = detector(buggy_code)[0]["text"]

diff = code_diff.difference(buggy_code, fixed_code, lang = "java") # x -> y
changed_line = diff.source_ast.position[0][0] # 3

```
If you like to try this quick start yourself interactively, you can also run the accompanying Jupyter notebook `demo.ipynb`.

## Evaluation
For our evalution, we run the `run_study_eval.py` script. To replicate our evaluation for the graph neural network (GNN), you can run the following command:
```bash
python run_study_eval.py gnn-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is the path to the saved file (in our case `../study/detector-results/gnn.jsonl`).

To replicate our evaluation for the Transformer, you can run the following command:
```bash
python run_study_eval.py transformer-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is again the path to the saved file (in our case `../study/detector-results/transformer.jsonl`).