package de.foellix.devstudy.webservice.dbconnections;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// @Jan participantId is an int now (was String before)
// @Jan timestamp is a long now (was String before)
// @Jan Removed IP -> Fix DB-table
// @Jan Add same IP as other participants (List of IDs) -> This or another DB-table? (see Participant.getSameIP())
// @Jan Why are lineNumberOfError and ProgrammID longs? Use ints instead?
@Entity
@Table(name = "Results", schema = "test")
public class Results {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;
	@Column(name = "participantId")
	int participantId;
	@Column(name = "sessionID")
	String sessionID;
	@Column(name = "ProgrammID")
	int ProgrammID;
	@Column(name = "isBuggy")
	String isBuggy;
	@Column(name = "lineNumberOfError")
	int lineNumberOfError;
	@Column(name = "timestamp")
	long timestamp;
	@Column(name = "attempt")
	int attempt;


	public Results(int participantId, String sessionID, int programmID, String isBuggy, int lineNumberOfError,
				   Long timestamp) {
		this(participantId, sessionID, programmID, isBuggy, lineNumberOfError, timestamp, 1);
	}

	public Results(int participantId, String sessionID, int programmID, String isBuggy, int lineNumberOfError,
				   Long timestamp, int attempt) {
		this.participantId = participantId;
		this.sessionID = sessionID;
		this.ProgrammID = programmID;
		this.isBuggy = isBuggy;
		this.lineNumberOfError = lineNumberOfError;
		this.timestamp = timestamp;
		this.attempt = attempt;
	}

	public Results() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getParticipantId() {
		return this.participantId;
	}

	public void setParticipantId(int participantId) {
		this.participantId = participantId;
	}

	public String getSessionID() {
		return this.sessionID;
	}

	public void setSessionID(String sessionID) {
		this.sessionID = sessionID;
	}

	public int getProgrammID() {
		return this.ProgrammID;
	}

	public void setProgrammID(int programmID) {
		this.ProgrammID = programmID;
	}

	public String getIsBuggy() {
		return this.isBuggy;
	}

	public void setIsBuggy(String isBuggy) {
		this.isBuggy = isBuggy;
	}

	public int getLineNumberOfError() {
		return this.lineNumberOfError;
	}

	public void setLineNumberOfError(int lineNumberOfError) {
		this.lineNumberOfError = lineNumberOfError;
	}

	public Long getTimestamp() {
		return this.timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public int getAttempt() {
		return attempt;
	}

	public void setSecondAtt(int attempt) {
		this.attempt = attempt;
	}

	@Override
	public String toString() {
		return "Results{" + "id=" + this.id + ", participantId=" + this.participantId + ", sessionID='" + this.sessionID
				+ '\'' + ", ProgrammID=" + this.ProgrammID + ", isBuggy='" + this.isBuggy + '\''
				+ ", lineNumberOfError=" + this.lineNumberOfError + ", timestamp='" + this.timestamp + '\'' + '}';
	}
}