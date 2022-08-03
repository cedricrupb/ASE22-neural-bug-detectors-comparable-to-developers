package de.foellix.devstudy.webservice;

import java.sql.SQLException;
import java.util.ArrayList;

import de.foellix.devstudy.webservice.data.survey.Survey;
import de.foellix.devstudy.webservice.data.survey.Task;
import de.foellix.devstudy.webservice.data.survey.Work;
import de.foellix.devstudy.webservice.dbconnections.Results;
import de.foellix.devstudy.webservice.helper.DbHelper;

public class DBConnectTest {

    static final String sessionID = "1a";

    public static void main(String[] args) throws SQLException {
        DbHelper helper = DbHelper.getInstance();
        System.out.println(DbHelper.getInstance().listResultEntries());
        Participant participant = new Participant(sessionID);
        participant.setAttempt(2);
        final Results res = new Results(helper.getLastID()+1, sessionID, 4, "true", 3, System.currentTimeMillis());
        System.out.println(res.getId());
        DbHelper.getInstance().createResultEntry(res,participant);
        System.out.println(DbHelper.getInstance().listResultEntries());

        System.out.println("Last id is" + helper.getLastID());


        System.out.println(DbHelper.getInstance().listSurveyEntries());

        ArrayList<Task> list = new ArrayList<Task>();
        list.add(Task.DEVELOP);
        list.add(Task.REVIEW);
        final Survey survey = new Survey(sessionID, Survey.Team.SMALL, Survey.In.COMMERCIAL,
                new Work(Work.Codebase.OTHERS, list), Survey.Experience._2, Survey.Age._30,
                Survey.Origin.AUSTRALIA, Survey.Gender.FEMALE
        );
        System.out.println(survey);

        DbHelper.getInstance().createSurveyEntry(survey, participant);
        System.out.println(DbHelper.getInstance().listSurveyEntries());

        testDetectionOfDublicatedUsers();

    }

    private static void testDetectionOfDublicatedUsers() {
        ArrayList<Task> list = new ArrayList<Task>();
        list.add(Task.DEVELOP);
        list.add(Task.REVIEW);
        final Survey survey = new Survey(sessionID+"v", Survey.Team.SMALL, Survey.In.COMMERCIAL,
                new Work(Work.Codebase.OTHERS, list), Survey.Experience._2, Survey.Age._30,
                Survey.Origin.AUSTRALIA, Survey.Gender.FEMALE
        );
        System.out.println(survey);
        Participant participant = new Participant(sessionID);
        participant.setId(participant.getId()-2);
        Participant p2 = new Participant( sessionID+"v");
        p2.setId(p2.getId()-1);
        participant.sameIPas( p2);
        DbHelper.getInstance().createSurveyEntry(survey, participant);

        p2.setId(2);
        DbHelper.getInstance().createSurveyEntry(survey, participant);


    }
}