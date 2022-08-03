# Pre-filtered data
This folder contains the pre-filtered data used for the evaluation in json-format.  
The file `test_Results_cleaned+mintime+fullAtt.json` contains the data from the table `results` (the answers of the developers) 
after removing the not-completed attempts and the attempts where the developer takes
fewer than 60s for the full attempt.  
The file `answers_by_user.json` contains the survey data (age, experience,... ) and the users answers in a single file, whereas the participants that aborted the trial are removed.

Both files are generated using the notebook `cleanup_and_merge.ipynb` from the top level folder `notebooks`.
