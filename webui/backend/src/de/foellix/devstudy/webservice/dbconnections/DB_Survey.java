
package de.foellix.devstudy.webservice.dbconnections;

import de.foellix.devstudy.webservice.data.survey.Survey;
import de.foellix.devstudy.webservice.data.survey.Task;
import de.foellix.devstudy.webservice.data.survey.Work;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.*;


@Entity
@Table(name = "DB_Survey", schema = "test")
public class DB_Survey {

    private static final String DELIMITAOR_EXPERIENCE = ",";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name = "sessionid")

    private String sessionid;
    @Column(name = "team")
    private String team;
    @Column(name = "ctx")
    private String in;
    @Column(name = "codebase")
    private String codebase;
    @Column(name = "task")
    private String task;


    @Column(name = "experience")
    private String experience;
    @Column(name = "age")
    private String age;
    @Column(name = "origin")
    private String origin;
    @Column(name = "gender")
    private String gender;


    public DB_Survey() {
    }

    public DB_Survey(Survey survey) {
        this.sessionid = survey.getSessionid();
        this.team = survey.getTeam().toString();
        this.in = survey.getIn().toString();
        this.codebase = survey.getWork().getCodebase().toString();
        this.task = String.join(DELIMITAOR_EXPERIENCE, survey.getWork().getTasks().stream()
                .map(t -> t.toString()).collect(Collectors.toList()));
        this.experience = survey.getExperience().toString();
        this.age = survey.getAge().toString();
        this.origin = survey.getOrigin().toString();
        this.gender = survey.getGender().toString();
    }

    public Survey toSurvey() {
        return new Survey(
                sessionid, Survey.Team.fromValue(team),
                Survey.In.fromValue(in), new Work(Work.Codebase.fromValue(codebase),
                this.task == null || task.isBlank() ? new ArrayList<>() : Arrays.stream(task.split(DELIMITAOR_EXPERIENCE)).map(e -> Task.fromValue(e)).collect(Collectors.toList()))
                , Survey.Experience.fromValue(experience), Survey.Age.fromValue(age),
                Survey.Origin.fromValue(origin), Survey.Gender.fromValue(gender)
        );
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSessionid() {
        return sessionid;
    }

    public void setSessionid(String sessionid) {
        this.sessionid = sessionid;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getIn() {
        return in;
    }

    public void setIn(String in) {
        this.in = in;
    }

    public String getCodebase() {
        return codebase;
    }

    public void setCodebase(String codebase) {
        this.codebase = codebase;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "DB_Survey{" +
                "id=" + id +
                ", sessionid='" + sessionid + '\'' +
                ", team='" + team + '\'' +
                ", in='" + in + '\'' +
                ", codebase='" + codebase + '\'' +
                ", task='" + task + '\'' +
                ", experience='" + experience + '\'' +
                ", age='" + age + '\'' +
                ", origin='" + origin + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DB_Survey db_survey = (DB_Survey) o;
        return id == db_survey.id && Objects.equals(sessionid, db_survey.sessionid) && Objects.equals(team, db_survey.team) && Objects.equals(in, db_survey.in) && Objects.equals(codebase, db_survey.codebase) && Objects.equals(task, db_survey.task) && Objects.equals(experience, db_survey.experience) && Objects.equals(age, db_survey.age) && Objects.equals(origin, db_survey.origin) && Objects.equals(gender, db_survey.gender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sessionid, team, in, codebase, task, experience, age, origin, gender);
    }
}
