package de.foellix.devstudy.webservice.tasks;

import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Task {
	private String taskId;
	private String code;
	private boolean buggy;
	private int bugLineNum;
	private int localTaskId;

	public static Task fromJSON(JSONObject json) {
		final String taskId = json.getString("project") + "@" + json.getString("commit");

		int lineNum = json.getInt("line_num");
		boolean buggy = lineNum >= 0;
		int localTaskId = -1;

		if(!json.isNull("task_id")){
			localTaskId = json.getInt("task_id");
		}

		return new Task(taskId, json.getString("func_code"), buggy, lineNum + 1, localTaskId);
	}

	public Task(String taskId, String methodCode, boolean buggy, int bugLineNum, int localTaskId) {
		this.taskId = taskId;
		this.code = methodCode;
		this.buggy = buggy;
		this.bugLineNum = bugLineNum;
		this.localTaskId = localTaskId;
	}

	public Task(String taskId, String methodCode, boolean buggy, int bugLineNum) {
		this(taskId, methodCode, buggy, bugLineNum, -1);
	}

	@JsonIgnore
	public String getTaskId() {
		return this.taskId;
	}

	public String getCode() {
		return this.code;
	}

	@JsonIgnore
	public boolean isBuggy() {
		return this.buggy;
	}

	@JsonIgnore
	public int getBugLineNum() {
		return this.bugLineNum;
	}

	@JsonIgnore
	public int getLocalTaskId() {
		return this.localTaskId;
	}

	@Override
	public String toString() {
		String taskPrefix = "Task";
		
		if(this.localTaskId > 0){
			taskPrefix += "#" + this.getLocalTaskId();
		}

		return taskPrefix + " (" + this.getTaskId() + ", is_buggy = " + this.isBuggy() + ")";
	}
}