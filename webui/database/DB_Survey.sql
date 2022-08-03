create table DB_Survey
(
    id         int auto_increment,
    sessionid  char(255) null,
    team       char(255) null,
    codebase   char(255) null,
    task       char(255) null,
    experience char(255) null,
    age        char(255) null,
    origin     char(255) null,
    gender     char(255) null,
    ctx        char(255) null,
    constraint Participant_id_uindex
        unique (id)
);

alter table DB_Survey
    add primary key (id);

