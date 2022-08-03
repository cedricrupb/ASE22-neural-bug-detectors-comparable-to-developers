
package de.foellix.devstudy.webservice.data.result;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.processing.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "sessionid", "buggy", "lineNumber" })
@Generated("jsonschema2pojo")
public class Result {

	@JsonProperty("sessionid")
	private String sessionid;
	@JsonProperty("buggy")
	private Result.Buggy buggy;
	@JsonProperty("lineNumber")
	private Integer lineNumber;

	@JsonProperty("sessionid")
	public String getSessionid() {
		return this.sessionid;
	}

	@JsonProperty("sessionid")
	public void setSessionid(String sessionid) {
		this.sessionid = sessionid;
	}

	@JsonProperty("buggy")
	public Result.Buggy getBuggy() {
		return this.buggy;
	}

	@JsonProperty("buggy")
	public void setBuggy(Result.Buggy buggy) {
		this.buggy = buggy;
	}

	@JsonProperty("lineNumber")
	public Integer getLineNumber() {
		return this.lineNumber;
	}

	@JsonProperty("lineNumber")
	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		sb.append(Result.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this)))
				.append('[');
		sb.append("sessionid");
		sb.append('=');
		sb.append(((this.sessionid == null) ? "<null>" : this.sessionid));
		sb.append(',');
		sb.append("buggy");
		sb.append('=');
		sb.append(((this.buggy == null) ? "<null>" : this.buggy));
		sb.append(',');
		sb.append("lineNumber");
		sb.append('=');
		sb.append(((this.lineNumber == null) ? "<null>" : this.lineNumber));
		sb.append(',');
		if (sb.charAt((sb.length() - 1)) == ',') {
			sb.setCharAt((sb.length() - 1), ']');
		} else {
			sb.append(']');
		}
		return sb.toString();
	}

	@Generated("jsonschema2pojo")
	public enum Buggy {

		YES("yes"), NO("no");

		private final String value;
		private final static Map<String, Result.Buggy> CONSTANTS = new HashMap<>();

		static {
			for (final Result.Buggy c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		Buggy(String value) {
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
		public static Result.Buggy fromValue(String value) {
			final Result.Buggy constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

}
