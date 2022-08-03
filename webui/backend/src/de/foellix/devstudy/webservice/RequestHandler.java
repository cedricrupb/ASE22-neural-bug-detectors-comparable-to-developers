package de.foellix.devstudy.webservice;

import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.Random;

import org.glassfish.grizzly.http.server.Request;

import de.foellix.devstudy.webservice.Participant.Score;
import de.foellix.devstudy.webservice.Participant.Status;
import de.foellix.devstudy.webservice.data.result.Result;
import de.foellix.devstudy.webservice.data.survey.Survey;
import de.foellix.devstudy.webservice.dbconnections.Results;
import de.foellix.devstudy.webservice.helper.DbHelper;
import de.foellix.devstudy.webservice.helper.Helper;
import de.foellix.devstudy.webservice.tasks.Task;
import de.foellix.devstudy.webservice.tasks.TaskSet;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/*
 * CAREFUL: A new instance of this class will be created for each request!
 */
@Path("/")
public class RequestHandler {
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String indexString(@Context Request request) {
		// Output
		Helper.msg(SaltAndHashHelper.getInstance().getSaltedAndHashedIP(request.getRemoteAddr())
				+ " requested the index page!");

		return Pages.getIndex();
	}

	@GET
	@Path("index.html")
	@Produces(MediaType.TEXT_HTML)
	public String indexHTML(@Context Request request) {
		return indexString(request);
	}

	@GET
	@Path("sessionid")
	@Produces(MediaType.TEXT_PLAIN)
	public Response sessionid(@Context Request request, @QueryParam("secondAttempt") String secondAttempt) {
		// Get participant
		final Participant p = SaltAndHashHelper.getInstance().getParticipant(String.valueOf(request.getRemoteAddr()),
				SaltAndHashHelper.getInstance().getNewSessionID());

		// Set second attempt
		if (Boolean.valueOf(secondAttempt).booleanValue()) {
			p.setAttempt(p.getAttempt() + 1);
		}

		// Output
		Helper.msg("Session ID \"" + p.getSessionID() + "\" given to hashed and salted IP: "
				+ SaltAndHashHelper.getInstance().getSaltedAndHashedIP(request.getRemoteAddr()));

		// Return session id
		return Response.ok(p.getSessionID(), MediaType.TEXT_PLAIN_TYPE.withCharset(StandardCharsets.UTF_8.toString()))
				.build();
	}

	@GET
	@Path("task.json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTask(@Context Request request, @QueryParam("sessionid") String sessionid) {
		// Get participant
		final Participant p = SaltAndHashHelper.getInstance().getParticipant(String.valueOf(request.getRemoteAddr()),
				sessionid);

		// Get current or new task - while ensuring that he does not get one which he/she has seen before
		if (p.isHasAnswered()) {
			int newTaskIndex = SampleHelper.getBucketShuffler().nextInt();

			if(p.hasSeenTask(newTaskIndex)){
				SampleHelper.getBucketShuffler().rejectInt(newTaskIndex);
				do {
					newTaskIndex++;
					if (newTaskIndex > TaskSet.getInstance().taskCount()) {
						newTaskIndex = 0;
					}
				} while (p.hasSeenTask(newTaskIndex));
			}

			// Assign new task
			Tracker.getInstance().setCurrentTask(p, newTaskIndex);
			p.assignTask(newTaskIndex);
		}

		// Get task
		final int taskIndex = Tracker.getInstance().getCurrentTask(p);
		final Task task = TaskSet.getInstance().getTaskByIndex(taskIndex);

		// Output
		Helper.msg("Task #" + taskIndex + " requested with error in Line " + task.getBugLineNum() + " (by: " + p
				+ ", time: " + System.currentTimeMillis() + ")");

		return Response.ok(task).build();
	}

	@GET
	@Path("score.json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response score(@Context Request request, @QueryParam("sessionid") String sessionid) {
		// Get participant
		final Participant p = SaltAndHashHelper.getInstance().getParticipant(String.valueOf(request.getRemoteAddr()),
				sessionid);
		p.setHasAnswered(false);

		// Get Score
		final Score score = p.getScore().snapShot();

		// Output
		Helper.msg("Replying score: " + score + " (" + p + ")");

		// Reset Score
		p.reset();

		return Response.ok(score).build();
	}

	@GET
	@Path("status.json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getStatus(@Context Request request, @QueryParam("sessionid") String sessionid) {
		// Get participant
		final Participant p = SaltAndHashHelper.getInstance().getParticipant(String.valueOf(request.getRemoteAddr()),
				sessionid);

		// Get Status
		final Status status = p.getStatus();

		// Output
		Helper.msg("Replying status: " + status + " (" + p + ")");

		return Response.ok(status).build();
	}

	@POST
	@Path("survey")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response survey(@Context Request request, Survey survey) throws SQLException {
		// Extract data from request
		final String sessionid = survey.getSessionid();

		// Get participant data
		final Participant p = SaltAndHashHelper.getInstance().getParticipant(String.valueOf(request.getRemoteAddr()),
				sessionid);

		// Build entry
		if (WebService.enableDB) {
			DbHelper.getInstance().createSurveyEntry(survey, p);
		}

		// Output
		Helper.msg("Received survey: " + survey);

		return Response.ok("Survey received!").build();
	}

	@POST
	@Path("result")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response result(@Context Request request, Result result) throws SQLException {
		// Extract data from request
		final String sessionid = result.getSessionid();
		final boolean buggy = result.getBuggy() == Result.Buggy.YES;
		final int lineNumber = result.getLineNumber().intValue();
		final long timestamp = System.currentTimeMillis();

		// Get participant data
		final Participant p = SaltAndHashHelper.getInstance().getParticipant(String.valueOf(request.getRemoteAddr()),
				sessionid);
		final int taskid = p.getCurrentTask();

		// Get task
		final Task task = TaskSet.getInstance().getTaskByIndex(taskid);
		if (task.isBuggy() == buggy) {
			p.getScore().setCorrectTasks(p.getScore().getCorrectTasks() + 1);
		}
		if (task.isBuggy() && task.getBugLineNum() == lineNumber) {
			p.getScore().setCorrectLinenumbers(p.getScore().getCorrectLinenumbers() + 1);
		}

		// Build result
		p.setHasAnswered(true);
		p.incTaskDone();
		final Results res = new Results(p.getId(), sessionid, taskid, String.valueOf(buggy), lineNumber, timestamp);
		if (WebService.enableDB) {
			DbHelper.getInstance().createResultEntry(res, p);
		}

		// Output
		Helper.msg("Received result: " + result);

		return Response.ok("Result received!", MediaType.TEXT_PLAIN_TYPE.withCharset(StandardCharsets.UTF_8.toString()))
				.build();
	}
}