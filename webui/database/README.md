# Database Schema
The database used for the web-service consists of three different tables:
1. DB_Survey
2. Results
3. UserWithSameID

In the following, we provide a short overview on the data and how to set up the table

## Table DB_Survey
This table contains the survey data from the users: 
| id  | sessionId                | team    | codebase | task             | experience | age  | origin   | gender   | ctx      |
| --- | ------------------------ | ------- | -------- | ---------------- | ---------- | ---- | -------- | -------- | -------- |
| 18  | `38238980-1642418905659` | `alone` | `oss`    | `develop,review` | `2-5`      | `30` | `europe` | `male`   | `own`    |
| 54  | `58995123-1641218907677` | `small` | `oss`    | `test`           | `5`        | `50` | `sa`     | `female` | `others` |

- `id` is the primary key and contains an id
- `sessionId` is also generated and used to connect the user data to the answers
- `team` is the team size the participant usually develops its code (one of `alone`, `small`, `large`)
- `codebase`is the sort of codebase the participant is usually developing in (one of `others`, `own`)
- `task` is the task the participant is usually doing (at least one of (`review`,`develop`,`test`)
- `experience` is the participants experience in working with Java (one of `2` (less than 2 years), `2-5`, `5`(more than 5 years))
- `age` is the participants' age (one of `30` ( < 30), `31-50`, `50`(> 50)))
- `origin` is the participants' origin (one of `africa`, `asia`, `na`(north america), `sa` (south america), `europe`, `australia`)
- `gener` is the participants' gender (one of `diverse`, `female`, `male`)
- `ctx` is the context the participant is mostly working in (one of `commercial`, `oss`, `others`)


## Table Results
This table contains the results from the participants trials.-
Each row contains the answer to a single task.

| ID  | participantId | sessionID                  | ProgrammID | isBuggy | lineNumberOfError | timestamp     | attempt |
| --- | ------------- | -------------------------- | ---------- | ------- | ----------------- | ------------- | ------- |
| 23  | 18            | `38238980-1642418905659`   | 19         | `true`  | 5                 | 1642410359194 | 1       |
| 24  | 18            | `1662786446-1642409030329` | 72         | `false` | -1                | 1642410373572 | 2       |

- `ID` is the primary key and contains an id
- `participantId` is the participants id from the table `DB_Survey`
- `sessionID` the session id
- `ProgrammID` the id of the program the answer was given for
- `isBuggy` a boolean, indicating if the participant selected that the program contains a bug or not 
- `lineNumberOfError` the line number selected by the participant, if she selects a line, `-1` otherwise
- `timestamp` the timestamp we received the answer
- `attempt` the number of the attempt the participant is currently doing

## Table UserWithSameID 
This table contains user IDs that likely belong to the same user.
As we allow second attempts, these data are not used in the evaluation.

| id  | firstid | firstid |
| --- | ------- | ------- |
| 25  | 18      | 135     |

- `ID` is the primary key and contains an id
- `firstid` the first user id
- `firstid` the second user id 


## Setting up the database
The files `DB_Survey.sql`, `Results.sql` and `UserWithSameID.sql` contain the
sql scripts to generate the tables.
Just create them using your favorite DB management system.
The database schema used was called `test`

To add the data collected during the experiments, use the scripts `test_DB_Survey.sql` and 
`test_Results.sql` in the folder `study/rawresults`.