# Installation
The project contains multiple submodules including the Web UI used to survey the participants, the Jupyter notebooks to perform the evaluation and the neural bug detectors used in our evaluation. Each submodule (also described in the README) has its own install instructions which you can look up in the respective subfolders. In this document, we give an overview over all installation processes.

**IMPORTANT:** We also provide a virtual machine (see README - [link to VM](https://doi.org/10.5281/zenodo.6957850) where all submodules are pre-installed. If you like to test or replicate our results, we would highly recommend to use the provided virtual machine.
If you decide to the virtual machine, you can skip the manual installation process
and directly proceed with [usage instruction for the VM](#3-usage-instruction-vm).

# 1. Manual installation

In this section, we provide a comprehensive instruction to install and run the artifact manually.

**Dependencies:** All scripts and implementations are tested under Python 3.8, NodeJS 16 and Java 17 (OpenJDK). The scripts are mainly tested on machines running Linux (Debian). However, an installation under Windows or Mac OS X should also be possible.

## 1.1 Web UI for the survey
The web interface for performing the survey with our participants consists of a web frontend (`webui/frontend`) and a backend (`webui/backend`). The front end is used to display the website for the user. In the backend, we have implemented the business logic and the storage mechanism (`webui/database`).

**NOTE:** The step describes how to replicate the setup for our developer study. It is not expected that developer study is replicated here. You can start from our collected developer answers in [Step 2](#12-evaluation-of-the-neural-bug-detectors) for replicating our results.

### 1.1.1 Installation of Frontend ("webui/frontend")
This application is the client for the FixMyVars study.
The source code can be found in the **src** directory.

#### Instructions

1. Use the **.env** file to configure the application.
    - Set the entry **REACT_APP_API_ORIGIN** to the URL of the backend server (if you want to use mock requests for testing, leave this field empty: `REACT_APP_API_ORIGIN=`).
    - If you want to host the client on a different basename (e.g. www.fixmyvars.de/study), set the **REACT_APP_BASENAME** entry to **study**.
2. Run the following command to install all required dependencies.
```
npm install
```
3. Run the following command to build the production-ready application.
```
npm run build
```
4. Using a webserver of your choice, you can now browse the **build** folder, which contains the production-ready application.

\
Instead of using a webserver, a development server can be started by running the following command after Step 2:
```
npm start
```
This will automatically open a browser window containing the application. Remember to set REACT_APP_API_ORIGIN to an empty value to use mock requests. 

### 1.1.2 Installation of Backend ("webui/backend")
This directory contains the source code (see directory ``src``) of the webservice used as a backend for the FixMyVars study.
The tasks used in the context of the study can be found in the ``tasks`` directory.

#### Compilation
The contained project is a Maven project and can be built via the following command:
```bash
mvn
```
Once the build process finishes the compiled webservice can be found in ``../target/build``.

#### Configuration
The webservice and its database configuration must be setup before running the webservice.
- To configure the webservice the file ``config.properties`` may be adapted.
  It allows to specify the allowed cross-origin URLs (see ``../src/de/foellix/devstudy/webservice/CORSFilter.java``) and a port under which the webservice will be reachable.
- To configure the database access the file ``hibernate.cfg.xml`` must be adapted.
  For example, the IP of the database host must be inserted (see ``%ip%``).

#### Execution
To start the webservice navigate to ``../target/build`` and run:
```bash
java -jar DevStudy-0.0.1-SNAPSHOT.jar
```
Once the webservice is started it can be stopped by entering ``exit``.

### 1.1.3 Installation of Database ("webui/database")
The files `DB_Survey.sql`, `Results.sql` and `UserWithSameID.sql` contain the
sql scripts to generate the tables.
Just create them using your favorite DB management system.

Setting up a local SQL database can be done in multiple ways.
One tutorial with SQL-Server and can be found [using Linux](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16) or [using Docker](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&pivots=cs1-bash).

To load the data collected during the experiments, use the scripts `test_DB_Survey.sql` and 
`test_Results.sql` in the folder `study/rawresults`.

### Expected outcome ("webui/screenshots_anonymized")
After the successfull installation, a web server should be running and your browser should show the web interface depicted by our screenshots. We have included a series of screenshots showing each step of our survey which also should be accessible via the web interface. Note however that tasks are drawn randomly and you might not get the same taks as shown in our screenshots.

## 1.2 Evaluation of the neural bug detectors
The implementation of the neural bug detectors can be found in `models/`.

### 1.2.1 Installation of neural bug detectors
In this work, we make use of a customized version of [nbfbaselines](https://github.com/cedricrupb/nbfbaselines). To install nbfbaselines, you first have to install all dependencies via PIP:
```bash
$ cd models
$ pip install -r requirements.txt
```
Afterwards, you can use the scripts and library from the same folder. The checkpoints for the neural bug detectors and potential parsing definitions for Java are dynamically loaded during runtime.

### 1.2.2 Quick start: Python API
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
Note that this script will download multiple files (bug detector definition and Java parsing definitions). For the artifact, these files are already downloaded in the virtual machine and therefore archived. Further, note that the bug detector (as described in the paper) also proposes a repair which we ignored in this study. To decide which line was fixed by the tool, we employ [code_diff](https://github.com/cedricrupb/code_diff):
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

### 1.2.3 Evaluation
For our evaluation, we run the `run_study_eval.py` script. To replicate our evaluation for the graph neural network (GNN), you can run the following command:
```bash
python run_study_eval.py gnn-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is the path to the saved file (in our case `../study/detector-results/gnn.jsonl`).

To replicate our evaluation for the Transformer, you can run the following command:
```bash
python run_study_eval.py transformer-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is again the path to the saved file (in our case `../study/detector-results/transformer.jsonl`).

The script should run without any errors. You can abort the script at anytime and still observe partial results. The results should be the same to the results stored in `../study/detector-results`.


## 1.3 Generating figures and paper results
Our evaluation was performed via Jupyter notebooks (`notebooks/`).

### 1.3.1 Installing Jupyter notebooks
Jupyter notebooks and the necessary dependencies can be installed by:
```bash
$ pip install notebook numpy javalang matplotlib matplotlib_venn
```
Then, after the installation, you can run the Jupyter notebook
```
$ cd notebooks
$ jupyter notebook
```

### 1.3.2 Testing the notebook
The notebooks can easily be run by executing all cells in the notebook.
The execution should finish with any errors.

# 2. Usage instruction (after manual installation)
While we showed how the artifact can be used to test the installation, we now detail how the artifact can be used to replicate our results or to repeat our developer survey.

## 2.1 Web UI for the survey
The web interface for performing the survey with our participants consists of a web frontend (`webui/frontend`) and a backend (`webui/backend`). The front end is used to display the website for the user. In the backend, we have implemented the business logic and the storage mechanism (`webui/database`).

**NOTE:** This step describes how to inspect the developer study we conducted. The developer study cannot and is not repeated. You can start from our collected developer answers in [Step 2](#22-evaluation-of-the-neural-bug-detectors) to replicate our results.

### Starting the interface
Start the web interface by opening a terminal and running the following command:

```bash
$ cd webui/backend/target/build
$ java -jar DevStudy-0.0.1-SNAPSHOT.jar
```

Afterwards, you can access the web interface via a browser. Just navigate to `http://localhost/FMV`.

## 2.2 Evaluation of the neural bug detectors (VM)
The implementation of the neural bug detectors can be found in the current `models/` directory.

### Quick start: Jupyter notebook
We provide a Jupyter notebook `demo.ipynb` to interactively test the neural bug detectors. To start the Jupyter notebook, run the following command:
```bash
$ jupyter notebook
```
Now, the browser should open up and you can navigate to demo.ipynb.
The Jupyter instance can be stopped by pressing Ctrl+C.

### Evaluation
For our evaluation, we run the `run_study_eval.py` script. To replicate our evaluation for the graph neural network (GNN), you can run the following command:
```bash
python run_study_eval.py gnn-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is the path to the saved file (in our case `../study/detector-results/gnn.jsonl`).

To replicate our evaluation for the Transformer, you can run the following command:
```bash
python run_study_eval.py transformer-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is again the path to the saved file (in our case `../study/detector-results/transformer.jsonl`).

## Step 2.3: Generating figures and paper results
Our evaluation was performed via Jupyter notebooks (`notebooks/`). To access the Jupyter notebooks, you can run the following command:
```
$ cd notebooks/
$ jupyter notebook
```
**NOTE:** We expect that the virtual environment from Step 2 is active.

### Running the notebooks to replicate evaluation
This notebooks folder contains Jupyter notebooks to
(1) preprocess and combine the data for later evaluation
(2) a script to reproduce all figures present in the paper and
(3) a notebook with additional findings, that are only partially part of the paper.

Moreover, it allows for further analysis of the collected study data.

### Data Cleaning and merging
The jupyter notebook `cleanup_and_merge.ipynb` cleans the raw data from `rawdata` 
as described in the section 2.5 `Data cleaning` and merges the data from the
two tables `survey` (which contains information on the participants) with
the results from the table `Results` (that contain the participants answers).  
The resulting combined data is stored in the JSON file called `answers_by_user.json`

### Generating the figures from the paper
The notebook `gen-paper-figures.ipynb` generates all figures from the paper.
(The headlines refer to the individual figures of the paper)


# 3. Usage instruction (VM)
In the previous sections, we gave a comprehensive overview of the installation and the basic steps to replicate our experiments. In the following, we describe how these steps can be performed with our virtual machine.
In this case a manual installation is **not** necessary.

The VM can be downloaded [here](https://doi.org/10.5281/zenodo.6957850).  
For the best possible experience:
- set the *video memory* to 128 MB or more
- and activate *3D acceleration*.

From now on, we expect that the virtual machine is started and we are inside the machine.  
(Any password you may be asked for inside the VM is: `ase22`)

## 3.1 Web UI for the survey
The web interface for performing the survey with our participants consists of a web frontend (`webui/frontend`) and a backend (`webui/backend`). The front end is used to display the website for the user. In the backend, we have implemented the business logic and the storage mechanism (`webui/database`).

**NOTE:** This step describes how to inspect the developer study we conducted. The developer study cannot and is not repeated. You can start from our collected developer answers in [Step 2](#32-evaluation-of-the-neural-bug-detectors-vm) to replicate our results.

### Starting the interface
We pre-installed all components of our web interface. Therefore, it can easily be started by opening a terminal and running the following command:
```bash
$ ~/startArtifact.sh
```

Afterwards, you can access the web interface via a browser. Just navigate to `http://localhost/FMV` or simply run:
```bash
$ firefox http://localhost/FMV
```
Finally, after a test trial, you can view the results (or entries) within the database with dbeaver-ce. Launch dbeaver-ce via the VM's GUI or with the following command:
```bash
$ dbeaver-ce
```


## 3.2 Evaluation of the neural bug detectors (VM)
For this step, we now employ virtual environment with pre-installed software. For this,
execute the following commands:
```bash
$ source ~/py39/bin/activate
$ cd ~/artifact/models
```
The implementation of the neural bug detectors can be found in the current `models/` directory.


### Quick start: Jupyter notebook
We provide a Jupyter notebook `demo.ipynb` to interactively test the neural bug detectors. To start the Jupyter notebook, run the following command:
```bash
$ jupyter notebook
```
Now, the browser should open up and you can navigate to demo.ipynb.
The Jupyter instance can be stopped by pressing Ctrl+C.

### Evaluation
For our evaluation, we run the `run_study_eval.py` script. To replicate our evaluation for the graph neural network (GNN), you can run the following command:
```bash
python run_study_eval.py gnn-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is the path to the saved file (in our case `../study/detector-results/gnn.jsonl`).

To replicate our evaluation for the Transformer, you can run the following command:
```bash
python run_study_eval.py transformer-study-java ../study/benchmark.jsonl [output-jsonl]
``` 
Here, `[output-jsonl]` is again the path to the saved file (in our case `../study/detector-results/transformer.jsonl`).

## Step 3.3: Generating figures and paper results
Our evaluation was performed via Jupyter notebooks (`~/artifact/notebooks/`). To access the Jupyter notebooks, you can run the following command:
```
$ cd ~/artifact/notebooks/
$ jupyter notebook
```
**NOTE:** We expect that the virtual environment from Step 2 is active.

### Running the notebooks to replicate evaluation
This notebooks folder contains Jupyter notebooks to
(1) preprocess and combine the data for later evaluation
(2) a script to reproduce all figures present in the paper and
(3) a notebook with additional findings, that are only partially part of the paper.

Moreover, it allows for further analysis of the collected study data.

### Data Cleaning and merging
The jupyter notebook `cleanup_and_merge.ipynb` cleans the raw data from `rawdata` 
as described in the section 2.5 `Data cleaning` and merges the data from the
two tables `survey` (which contains information on the participants) with
the results from the table `Results` (that contain the participants answers).  
The resulting combined data is stored in the JSON file called `answers_by_user.json`

### Generating the figures from the paper
The notebook `gen-paper-figures.ipynb` generates all figures from the paper.
(The headlines refer to the individual figures of the paper)