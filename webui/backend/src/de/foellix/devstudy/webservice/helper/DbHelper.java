package de.foellix.devstudy.webservice.helper;

import java.io.File;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.stream.Collectors;

import de.foellix.devstudy.webservice.Participant;
import de.foellix.devstudy.webservice.dbconnections.DB_Survey;
import de.foellix.devstudy.webservice.data.survey.Survey;
import de.foellix.devstudy.webservice.dbconnections.UserWithSameID;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

import de.foellix.devstudy.webservice.dbconnections.Results;

public class DbHelper {
    private SessionFactory sessionFactory;

    private static DbHelper instance = new DbHelper();

    private DbHelper() {
        System.out.print("Establishing database connection... ");
        final File configFile = new File("hibernate.cfg.xml");

        // Deactivate massive log
        java.util.logging.Logger.getLogger("org.hibernate").setLevel(Level.OFF);

        final StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure(configFile).build();

        try {
            this.sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
            System.out.println("done");
        } catch (final Exception e) {
            // TODO: @Jan handle properly or not ;-)
            System.out.println("failed (" + e.getClass().getSimpleName() + ": " + e.getMessage() + ")");
            this.sessionFactory = null;
        }
    }

    public static DbHelper getInstance() {
        return instance;
    }

    /**
     * Retrieves the last id given to a participant from the DB.
     * <p>
     * Returns either the highest id that can be found in the DB or 0 if no ID was given to anyone, yet.
     */
    public int getLastID() {
        //  @Jan implement properly (DONE)
        final Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        @SuppressWarnings("unchecked") final List<Results> entries = session.createQuery("from Results").list();
        session.getTransaction().commit();
        session.close();
        return entries.stream().mapToInt(e -> e.getParticipantId()).max().orElse(0);


    }

    /**
     * In hibernate 'creating' is the same as 'updating'
     */
    public void createResultEntry(Results obj, Participant p) {
        updateResultEntry(obj, p);
    }

    /**
     * Creates a session, a transaction for that session, gives the ResultEntry instance to the hibernate library to prepare to store, and then commits the transaction to persist it
     */
    public void updateResultEntry(Results obj, Participant p) {
    	obj.setSecondAtt(p.getAttempt() );
        final Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        session.save(obj);
        session.getTransaction().commit();
        session.close();
    }

    /**
     * Creates a session, a transaction for that session, instructs hibernate to delete the entry, and then commits the transaction
     */
    public void deleteResultEntry(Results aCustomer) {
        final Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        session.delete(aCustomer);
        session.getTransaction().commit();
        session.close();
    }

    /**
     * Creates a session, a transaction for that session, instructs hibernate to find the entry with the given unique identifier, and then commits the transaction to run the query
     */
    public Results readResultEntriy(int id) {
        final Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        final Results customer = session.find(Results.class, id);
        session.getTransaction().commit();
        session.close();
        return customer;
    }

    /**
     * Creates a SQL-like query criteria to list all the ResultEntry in the database.
     */
    public List<Results> listResultEntries() {
        final Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        @SuppressWarnings("unchecked") final List<Results> customers = session.createQuery("from Results").list();
        session.getTransaction().commit();
        session.close();
        return customers;
    }


    /**
     * Add a new survey entry and participant entry in the databases.
     */
    public void createSurveyEntry(Survey survey, Participant p) {
        final Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        session.save(new DB_Survey(survey));
        session.getTransaction().commit();


        //Now, store all new information from the Participant (the same ids)
        int partID = p.getId();

        session.beginTransaction();
        @SuppressWarnings("unchecked") final List<UserWithSameID> duplicateList =
                session.createQuery("from UserWithSameID").list();
        session.getTransaction().commit();

        //Compute the ids that are not stored in the database
        Set<Integer> newEntries = p.getSameIP().stream().map(e -> e.getId()).collect(Collectors.toSet());
        for(UserWithSameID pair : duplicateList){
            if (pair.getFirstid() == partID){
                newEntries.remove(pair.getSecondid());
            }else if(pair.getSecondid() == partID){
                newEntries.remove(pair.getFirstid());
            }
        }


        for(Integer secondId : newEntries){
            session.beginTransaction();
            session.save(new UserWithSameID(partID, secondId));
            session.getTransaction().commit();
        }


        session.close();

    }

    /**
     * Creates a SQL-like query criteria to list all the Survey in the database.
     */
    public List<Survey> listSurveyEntries() {
        final Session session = this.sessionFactory.openSession();
        session.beginTransaction();
        @SuppressWarnings("unchecked") final List<DB_Survey> surveyElemes =
                session.createQuery("from DB_Survey").list();
        session.getTransaction().commit();
        session.close();

        return surveyElemes.stream().map(e -> e.toSurvey()).collect(Collectors.toList());
    }
}