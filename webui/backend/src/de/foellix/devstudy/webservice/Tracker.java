package de.foellix.devstudy.webservice;

import java.util.HashMap;
import java.util.Map;

public class Tracker {
	private Map<Participant, Integer> map;

	private static Tracker instance = new Tracker();

	private Tracker() {
		this.map = new HashMap<>();
	}

	public static Tracker getInstance() {
		return instance;
	}

	public int getCurrentTask(Participant participant) {
		if (this.map.containsKey(participant)) {
			return this.map.get(participant);
		}
		return -1;
	}

	public void setCurrentTask(Participant participant, int taskIndex) {
		this.map.put(participant, taskIndex);
	}
}