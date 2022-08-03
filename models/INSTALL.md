# Installation of NBFBaselines (outside of the VM)
In this work, we make use of a customized version of [nbfbaselines](https://github.com/cedricrupb/nbfbaselines). To install nbfbaselines, you first have to install all dependencies via PIP:
```bash
$ pip install -r requirements.txt
```
Afterwards, you can use the scripts and library from the same folder. The checkpoints for the neural bug detectors and potential parsing definitions for Java are dynamically loaded during runtime.

# Installation of NBFBaselines (inside the VM)
The libraries are pre-installed in the VM and therefore this step can be skipped.