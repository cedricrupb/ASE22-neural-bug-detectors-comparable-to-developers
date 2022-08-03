import os
import json
import argparse

import code_diff as cd

from glob import glob
from tqdm import tqdm
from copy import copy

from nbfbaselines import NBFModel

from collections import defaultdict


def iterate_examples(eval_dir):
    if os.path.isfile(eval_dir):
        files = [eval_dir]
    else:
        files = glob(os.path.join(eval_dir, "*.jsonl"))

    for file in files:
        with open(file, "r") as lines:
            for line in lines:
                yield json.loads(line)


def _aggregate(predictions, agg_type = "max"):
    agg_dict = defaultdict(list)

    for prediction in predictions:
        p_key = (prediction["buggy"], prediction["line_num"]) 
        agg_dict[p_key].append(prediction["prob"])

    agg_fn = {"max": max, "sum": sum}[agg_type]

    return [{
        "buggy": buggy,
        "line_num": line_num,
        "prob" : agg_fn(probs)
    } 
    for (buggy, line_num), probs in agg_dict.items()]


def compute_diff(A, B):
    A = "public class Test{%s}" % A
    B = "public class Test{%s}" % B
    return cd.difference(A, B, lang = "java")


def compute_predictions(nbf_model, func_code, topk = 1, agg_type = "max"):
    predictions = []

    output = nbf_model(func_code, topk = topk)
    if topk == 1: output = [output]

    for cand_solution in output:
        
        try:
            if cand_solution["before"] == "[CLS]": raise
            cand_diff    = compute_diff(func_code, cand_solution["text"])
        except Exception:
            predictions.append({
                "buggy": False,
                "line_num": -1,
                "prob" : cand_solution["prob"]
            })
            continue
        
        changed_line = cand_diff.source_ast.position[0][0]

        if changed_line == 0: continue

        predictions.append({
            "buggy": True,
            "line_num": changed_line,
            "prob": cand_solution["prob"]
        })

    return _aggregate(predictions, agg_type)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("checkpoint_dir")
    parser.add_argument("eval_dir")
    parser.add_argument("output_file")

    args = parser.parse_args()

    nbf_model = NBFModel.from_pretrained(args.checkpoint_dir)
    nbf_model.model = nbf_model.model.eval()

    with open(args.output_file, "w") as o:
        for example in tqdm(iterate_examples(args.eval_dir), total = 310):
            func_code = example["func_code"]

            predictions = compute_predictions(nbf_model, func_code, topk = 25, agg_type = "max")
            
            output = copy(example)
            output["predictions"] = predictions
            o.write(json.dumps(output) + "\n")



if __name__ == "__main__":
    main()
