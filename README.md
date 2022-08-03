# Artifact for "Are Neural Bug Detectors Comparable to Software Developers on Variable Misuse bugs?"

This artifact includes all results related to our study "Are Neural Bug Detectors Comparable to Software Developers on Variable Misuse bugs?". 

In our study, we compared the performance of developers in identifying variable misuse bugs with the performance of neural bug detectors. For estimating the developer performance, we performed a survey with over 100 developers. The answers collected in this survey are provided in this artifact in a machine readable format. How to facilitate the answers in your own project (reuse) is described in our [quick start guide](#quick-start).

In addition, we included all necessary scripts to replicate our evaluation results in this artifact. We describe them in the following.

**Content**
The artifact includes the following components:
- **Web UI:**
The developer survey was performed online in the browser of the participants. For this, we created a custom web interface tailored for our study task. We included both the implementation of the frontend (website) and backend implementation (buisness logic and database) in this artifact. Therefore, it is not only possible to replicate our survey with same interface and a new group of participants but it is also possible to extend the interface for future studies. (Folder: webui/)

- **Neural bug detectors:**
We evaluate the performance of the developers against two neural bug detectors. In this artifact, we include the bug detectors (implementation + trained models) and the evaluation script used for producing our results. Besides the replication of our bug detector evaluation, the detectors can also be used in future
projects for detecting variable misuse bugs in Java methods. (Folder: models/)

- **Analysis scripts:** After collecting the raw results from the developers and neural bug detectors, we performed several analysis to gain insights how developers and bug detectors compare on the variable misuse task. We include all analysis steps in form of Jupyter notebooks in the artifact. With this, it is possible to reproduce all the figures of our paper. (Folder: notebooks/)

We also provide a more detailed overview of the [project structure](#project-structure) below.

**USAGE:** The collection of participant answers are provided in a machine readable format and can be easily reused outside of this artifact. To replicate our results, we recommend the use of our virtual machine which is available [here](https://doi.org/10.5281/zenodo.6957850).
However, the artifact also contains the necessary content to manually install all the components which makes it simpler to facilitate the components of this artifact. For the manual installation please refer to the installation guide ("INSTALL.md").

## Quick start
To facilitate answers from over 100 developers on variable misuses in Java methods, you can find a summary of our study results in `participant_answers.json`. All participant answers are stored in a serialized JSON object. The object lists a number of *trials* (identified by a trial Id) which is assigned to a list of *answers*. An example for an answer object is shown below: 
```json
{
    // task info
    "ProgrammID": 25,
    "program": "[Method code for task]",
    "token": 110,
    "expectedAnswer": 5,

    // given answer
    "attempt": 2,
    "lineNumberOfError": -2,
    "taskSolvedCorrectly": false,
    "correctLineNumber": false,
    "timestamp": 1642397964613,
    
    // developer demographics
    "exp": "5",
    "task": "test,develop",
    "ctx": "oss",
    "codebase": "own",
    "team": "alone",
    "age": "31-50",
}
```
In the next section, you will find a detailed explaination of all information available collected for an answer.

## Participant answers
Each answer object stores information not only about the answer itself but also about general demographics of the *developer* and the answered *task* (code snippet and error location):

- **ProgrammID:** Unique identifier for each task,
- **program:** The code snippet shown to the developer,
- **token:** number of program tokens in the program,
- **expectedAnswer:** The error location of the variable misuse to be found (or a value < 0 if the program does not contain a variable misuse),
- **attempt:** The attempt number for our study for the same developer,
- **lineNumberOfError:** the answer submitted by the developer (line number < 0: the developer thinks that the task does not contain a variable misuse),
- **taskSolvedCorrectly:** True if the developer provides a correct answer (buggy or not)
- **correctLineNumber:** True if the developer finds the line containing a variable misuse,
- **timestamp:** Timestamp when the answer was submitted,
- **exp:** Programming experience in years (< 2, 2-5, > 5 years),
- **task:** The typical task done during programming (test, develop, review),
- **ctx:** The development context (oss = open source software, commerical, others),
- **codebase:** The typical code base used during development (own, others),
- **team:** The typical team size that developer worked in (alone, small (< 10), large),
- **age:** the age of the developer (< 30, 31-50, > 50)

## Project structure
Our ultimate aim is that this artifact provide enough information to reproduce
our study in different contexts and/or different bug types. For this reason, we include further implementation, data gained produced during our evaluation and the interfaces used for surveying the developers. In the following, you will find an overview over the content provided by this artifact:
```
artifact
    |`- study: All results obtained from this study
    |    |`- rawresults: Raw unprocessed results from our developer study 
    |    |`- results: Preprocessed results of our developer study
    |    |`- detector-results: Output of the evaluated bug detectors
    |     `- benchmark.jsonl : The filtered benchmark used for this study
    ͘|`- webui: The web UI used for surveying the developers
    |     |`- backend: Backend server for processing user inputs
    |     |`- frontend: Frontend seen by the developers
    |     |`- database: Database schema used for storing answers
    |      `- screenshots_anonymized: Screenshots for a trial as seen by the developer
    |`- models: The neural bug detector models used in the study
    |     |`- nbfbaselines: The library implementing the bug detector models
    |     |`- demo.ipynb: A demo for the neural bug detectors
    |      `- run_study_eval.py: The script to evaluate the bug detectors
    |`- notebooks: All Jupyter notebooks to preprocess the data and produce our figures
    |`- figures: All figures of the paper
    |`- participant_answers.json: A file collecting all results of our study in a single file (after data cleaning)
    |`- INSTALL.md: installation guide
    |`- LICENSE.md: License of this project
     `- README.md: this README
```


