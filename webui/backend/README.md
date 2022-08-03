# FixMyVars-Artifact: Backend of the Web-Interface
This directory contains the source code (see directory ``src``) of the webservice used as a backend for the FixMyVars study.
The tasks used in the context of the study can be found in the ``tasks`` directory.

## Compilation
The contained project is a Maven project and, hence, can be built via the following command:
```bash
mvn
```
Once the build process finishes the compiled webservice can be found in ``.../target/build``.

## Configuration
The webservice and its database configuration must be setup before running the webservice.
- To configure the webservice the file ``config.properties`` may be adapted.
  It allows to specify the allowed cross-origin URLs (see ``.../src/de/foellix/devstudy/webservice/CORSFilter.java``) and a port under which the webservice will be reachable.
- To configure the database access the file ``hibernate.cfg.xml`` must be adapted.
  For example, the IP of the database host must be inserted (see ``%ip%``).

## Execution
To start the webservice navigate to ``.../target/build`` and run:
```bash
java -jar DevStudy-0.0.1-SNAPSHOT.jar
```
Once the webservice is started it can be stopped by entering ``exit``.