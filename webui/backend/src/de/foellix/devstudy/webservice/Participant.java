package de.foellix.devstudy.webservice;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

import de.foellix.devstudy.webservice.helper.DbHelper;
import de.foellix.devstudy.webservice.helper.Helper;

public class Participant {
	private static int lastID = -1;

	private int id;
	private String sessionID;
	private LinkedList<Integer> taskSeen;
	private int taskDone;
	private int attempt;
	private long started;
	private Set<Participant> sameIP;
	private Score score;
	private boolean answered;

	public Participant(String sessionID) {
		if (lastID < 0) {
			if (WebService.enableDB) {
				lastID = DbHelper.getInstance().getLastID();
			} else {
				lastID = 0;
			}
		}
		lastID++;
		this.id = lastID;
		this.sessionID = sessionID;
		this.taskSeen = new LinkedList<>();
		this.taskDone = 0;
		this.attempt = 0;
		this.started = -1;
		this.sameIP = new HashSet<>();
		this.score = new Score();
		this.answered = true;
	}

	public boolean hasSeenTask(int taskIndex) {
		return this.taskSeen.contains(taskIndex);
	}

	public boolean assignTask(int taskIndex) {
		if (this.taskDone == 0 && this.answered) {
			this.attempt++;
			Helper.info("Try #" + this.attempt + " recognized for: " + this);
			this.started = System.currentTimeMillis();
		}
		this.answered = false;
		return this.taskSeen.add(taskIndex);
	}

	public void reset() {
		this.taskDone = 0;
		this.started = -1;
		this.answered = true;
		this.score.reset();
	}

	public int getId() {
		return this.id;
	}

	public String getSessionID() {
		return this.sessionID;
	}

	public int getAttempt() {
		return this.attempt;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setSessionID(String sessionID) {
		this.sessionID = sessionID;
	}

	public void setAttempt(int attempt) {
		this.attempt = attempt;
	}

	public long getStarted() {
		return this.started;
	}

	public void incTaskDone() {
		this.taskDone++;
	}

	public int getTasksDone() {
		return this.taskDone;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + this.id;
		result = prime * result + ((this.sessionID == null) ? 0 : this.sessionID.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final Participant other = (Participant) obj;
		if (this.id != other.id) {
			return false;
		}
		if (this.sessionID == null) {
			if (other.sessionID != null) {
				return false;
			}
		} else if (!this.sessionID.equals(other.sessionID)) {
			return false;
		}
		return true;
	}

	public void sameIPas(Participant otherParticipant) {
		this.sameIP.add(otherParticipant);
	}

	public Set<Participant> getSameIP() {
		return this.sameIP;
	}

	public int getCurrentTask() {
		return this.taskSeen.getLast();
	}

	public void setHasAnswered(boolean value) {
		this.answered = value;
	}

	public boolean isHasAnswered() {
		return this.answered;
	}

	@Override
	public String toString() {
		return "Participant [ID=" + this.id + ", sessionID=" + this.sessionID + "]";
	}

	/*
	 * Score
	 */
	public Score getScore() {
		return this.score;
	}

	class Score {
		private int correctTasks;
		private int correctLinenumbers;

		public Score() {
			reset();
		}

		public void reset() {
			this.correctTasks = 0;
			this.correctLinenumbers = 0;
		}

		public int getCorrectTasks() {
			return this.correctTasks;
		}

		public int getCorrectLinenumbers() {
			return this.correctLinenumbers;
		}

		public void setCorrectTasks(int correctTasks) {
			this.correctTasks = correctTasks;
		}

		public void setCorrectLinenumbers(int correctLinenumbers) {
			this.correctLinenumbers = correctLinenumbers;
		}

		@Override
		public String toString() {
			return "Score [correctTasks=" + this.correctTasks + ", correctLinenumbers=" + this.correctLinenumbers + "]";
		}

		public Score snapShot() {
			final Score snapShot = new Score();
			snapShot.setCorrectTasks(this.correctTasks);
			snapShot.setCorrectLinenumbers(this.correctLinenumbers);
			return snapShot;
		}
	}

	/*
	 * Status
	 */
	public Status getStatus() {
		return new Status();
	}

	class Status {
		private int timeExpired;
		private int tasksDone;

		public Status() {
			final int secondsPassed;
			if (Participant.this.started > 0) {
				secondsPassed = Long.valueOf((System.currentTimeMillis() - getStarted()) / 1000).intValue();
			} else {
				secondsPassed = 0;
			}
			this.timeExpired = secondsPassed;
			this.tasksDone = Participant.this.getTasksDone();
		}

		public int getTimeExpired() {
			return this.timeExpired;
		}

		public int getTasksDone() {
			return this.tasksDone;
		}

		@Override
		public String toString() {
			return "Status [timeExpired=" + this.timeExpired + ", tasksDone=" + this.tasksDone + "]";
		}
	}
}