
package de.foellix.devstudy.webservice.data.survey;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.processing.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

@Generated("jsonschema2pojo")
public enum Task {

	TEST("test"), REVIEW("review"), DEVELOP("develop");

	private final String value;
	private final static Map<String, Task> CONSTANTS = new HashMap<>();

	static {
		for (final Task c : values()) {
			CONSTANTS.put(c.value, c);
		}
	}

	Task(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return this.value;
	}

	@JsonValue
	public String value() {
		return this.value;
	}

	@JsonCreator
	public static Task fromValue(String value) {
		final Task constant = CONSTANTS.get(value);
		if (constant == null) {
			throw new IllegalArgumentException(value);
		} else {
			return constant;
		}
	}

}
