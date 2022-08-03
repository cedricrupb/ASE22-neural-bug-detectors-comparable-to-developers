
package de.foellix.devstudy.webservice.data.survey;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.processing.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "codebase", "tasks" })
@Generated("jsonschema2pojo")
public class Work {

	@JsonProperty("codebase")
	private Work.Codebase codebase;
	@JsonProperty("tasks")
	private List<Task> tasks = null;

	public Work(){}

	public Work(Codebase codebase, List<Task> tasks) {
		this.codebase = codebase;
		this.tasks = tasks;
	}

	@JsonProperty("codebase")
	public Work.Codebase getCodebase() {
		return this.codebase;
	}

	@JsonProperty("codebase")
	public void setCodebase(Work.Codebase codebase) {
		this.codebase = codebase;
	}

	@JsonProperty("tasks")
	public List<Task> getTasks() {
		return this.tasks;
	}

	@JsonProperty("tasks")
	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		sb.append(Work.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this)))
				.append('[');
		sb.append("codebase");
		sb.append('=');
		sb.append(((this.codebase == null) ? "<null>" : this.codebase));
		sb.append(',');
		sb.append("tasks");
		sb.append('=');
		sb.append(((this.tasks == null) ? "<null>" : this.tasks));
		sb.append(',');
		if (sb.charAt((sb.length() - 1)) == ',') {
			sb.setCharAt((sb.length() - 1), ']');
		} else {
			sb.append(']');
		}
		return sb.toString();
	}

	@Generated("jsonschema2pojo")
	public enum Codebase {

		OWN("own"), OTHERS("others");

		private final String value;
		private final static Map<String, Work.Codebase> CONSTANTS = new HashMap<>();

		static {
			for (final Work.Codebase c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		Codebase(String value) {
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
		public static Work.Codebase fromValue(String value) {
			final Work.Codebase constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

}
