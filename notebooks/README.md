# Notebooks

This folder contains three notebooks to (1) preprocess and combine the data for later evaluation (2) a script to reproduce all figures present in the paper and (3) a notebook with
additional findings, that are only partially part of the paper.

Moreover, it allows for further analysis of the collected study data.

## Data Cleaning and merging
The jupyter notebook `cleanup_and_merge.ipynb` cleans the raw data from `rawdata` 
as described in the section 2.5 `Data cleaning` and merges the data from the
two tables `survey` (which contains information on the participants) with
the results from the table `Results` (that contain the participants answers).  
The resulting combined data are stored in the csv file called `answers_by_user.json`

## Generating the figures from the paper
The notebook `gen-paper-figures.ipynb` generates all figures from the paper.

