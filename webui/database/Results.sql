create table Results
(
    ID                int auto_increment
        primary key,
    participantId     int                             null,
    sessionID         varchar(255)                    null,
    ProgrammID        int                             null,
    isBuggy           varchar(45) collate utf8mb4_bin null,
    lineNumberOfError int                             null,
    timestamp         bigint(255)                     null,
    attempt           int                             null
)
    comment 'Database to store all results';

