# Detector outputs for all benchmark tasks
This folder contains all detector outputs produced by running the detector
on all benchmark tasks (see `benchmark.jsonl`). Results are stored in Jsonl format (each line contains a JSON object).

**Results:** For each tasks, we generate the top 25 predictions and aggregate the prediction per line (max). The aggregate predictions are stored (sorted according to the aggregated probability).