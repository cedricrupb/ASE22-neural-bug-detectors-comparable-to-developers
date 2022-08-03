
package de.foellix.devstudy.webservice.data.survey;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.processing.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "sessionid", "team", "in", "work", "experience", "age", "origin", "gender" })
@Generated("jsonschema2pojo")
public class Survey {

	@JsonProperty("sessionid")
	private String sessionid;
	@JsonProperty("team")
	private Survey.Team team;
	@JsonProperty("in")
	private Survey.In in;
	@JsonProperty("work")
	private Work work;
	@JsonProperty("experience")
	private Survey.Experience experience;
	@JsonProperty("age")
	private Survey.Age age;
	@JsonProperty("origin")
	private Survey.Origin origin;
	@JsonProperty("gender")
	private Survey.Gender gender;

	public Survey(String sessionid, Team team, In in, Work work, Experience experience, Age age, Origin origin,
			Gender gender) {
		this.sessionid = sessionid;
		this.team = team;
		this.in = in;
		this.work = work;
		this.experience = experience;
		this.age = age;
		this.origin = origin;
		this.gender = gender;
	}

	public Survey() {
	}

	@JsonProperty("sessionid")
	public String getSessionid() {
		return this.sessionid;
	}

	@JsonProperty("sessionid")
	public void setSessionid(String sessionid) {
		this.sessionid = sessionid;
	}

	@JsonProperty("team")
	public Survey.Team getTeam() {
		return this.team;
	}

	@JsonProperty("team")
	public void setTeam(Survey.Team team) {
		this.team = team;
	}

	@JsonProperty("in")
	public Survey.In getIn() {
		return this.in;
	}

	@JsonProperty("in")
	public void setIn(Survey.In in) {
		this.in = in;
	}

	@JsonProperty("work")
	public Work getWork() {
		return this.work;
	}

	@JsonProperty("work")
	public void setWork(Work work) {
		this.work = work;
	}

	@JsonProperty("experience")
	public Survey.Experience getExperience() {
		return this.experience;
	}

	@JsonProperty("experience")
	public void setExperience(Survey.Experience experience) {
		this.experience = experience;
	}

	@JsonProperty("age")
	public Survey.Age getAge() {
		return this.age;
	}

	@JsonProperty("age")
	public void setAge(Survey.Age age) {
		this.age = age;
	}

	@JsonProperty("origin")
	public Survey.Origin getOrigin() {
		return this.origin;
	}

	@JsonProperty("origin")
	public void setOrigin(Survey.Origin origin) {
		this.origin = origin;
	}

	@JsonProperty("gender")
	public Survey.Gender getGender() {
		return this.gender;
	}

	@JsonProperty("gender")
	public void setGender(Survey.Gender gender) {
		this.gender = gender;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		sb.append(Survey.class.getName()).append('@').append(Integer.toHexString(System.identityHashCode(this)))
				.append('[');
		sb.append("sessionid");
		sb.append('=');
		sb.append(((this.sessionid == null) ? "<null>" : this.sessionid));
		sb.append(',');
		sb.append("team");
		sb.append('=');
		sb.append(((this.team == null) ? "<null>" : this.team));
		sb.append(',');
		sb.append("in");
		sb.append('=');
		sb.append(((this.in == null) ? "<null>" : this.in));
		sb.append(',');
		sb.append("work");
		sb.append('=');
		sb.append(((this.work == null) ? "<null>" : this.work));
		sb.append(',');
		sb.append("experience");
		sb.append('=');
		sb.append(((this.experience == null) ? "<null>" : this.experience));
		sb.append(',');
		sb.append("age");
		sb.append('=');
		sb.append(((this.age == null) ? "<null>" : this.age));
		sb.append(',');
		sb.append("origin");
		sb.append('=');
		sb.append(((this.origin == null) ? "<null>" : this.origin));
		sb.append(',');
		sb.append("gender");
		sb.append('=');
		sb.append(((this.gender == null) ? "<null>" : this.gender));
		sb.append(',');
		if (sb.charAt((sb.length() - 1)) == ',') {
			sb.setCharAt((sb.length() - 1), ']');
		} else {
			sb.append(']');
		}
		return sb.toString();
	}

	@Generated("jsonschema2pojo")
	public enum Age {

		_30("30"), _31_50("31-50"), _50("50"), DISCLOSED("disclosed");

		private final String value;
		private final static Map<String, Survey.Age> CONSTANTS = new HashMap<>();

		static {
			for (final Survey.Age c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		Age(String value) {
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
		public static Survey.Age fromValue(String value) {
			final Survey.Age constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

	@Generated("jsonschema2pojo")
	public enum Experience {

		_2("2"), _2_5("2-5"), _5("5");

		private final String value;
		private final static Map<String, Survey.Experience> CONSTANTS = new HashMap<>();

		static {
			for (final Survey.Experience c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		Experience(String value) {
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
		public static Survey.Experience fromValue(String value) {
			final Survey.Experience constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

	@Generated("jsonschema2pojo")
	public enum Gender {

		FEMALE("female"), MALE("male"), DIVERSE("diverse"), DISCLOSED("disclosed");

		private final String value;
		private final static Map<String, Survey.Gender> CONSTANTS = new HashMap<>();

		static {
			for (final Survey.Gender c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		Gender(String value) {
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
		public static Survey.Gender fromValue(String value) {
			final Survey.Gender constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

	@Generated("jsonschema2pojo")
	public enum In {

		OSS("oss"), COMMERCIAL("commercial"), OTHERS("others");

		private final String value;
		private final static Map<String, Survey.In> CONSTANTS = new HashMap<>();

		static {
			for (final Survey.In c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		In(String value) {
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
		public static Survey.In fromValue(String value) {
			final Survey.In constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

	@Generated("jsonschema2pojo")
	public enum Origin {

		EUROPE("europe"), ASIA("asia"), AUSTRALIA("australia"), NA("na"), SA("sa"), AFRICA("africa"), DISCLOSED(
				"disclosed");

		private final String value;
		private final static Map<String, Survey.Origin> CONSTANTS = new HashMap<>();

		static {
			for (final Survey.Origin c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		Origin(String value) {
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
		public static Survey.Origin fromValue(String value) {
			final Survey.Origin constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

	@Generated("jsonschema2pojo")
	public enum Team {

		ALONE("alone"), SMALL("small"), LARGE("large");

		private final String value;
		private final static Map<String, Survey.Team> CONSTANTS = new HashMap<>();

		static {
			for (final Survey.Team c : values()) {
				CONSTANTS.put(c.value, c);
			}
		}

		Team(String value) {
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
		public static Survey.Team fromValue(String value) {
			final Survey.Team constant = CONSTANTS.get(value);
			if (constant == null) {
				throw new IllegalArgumentException(value);
			} else {
				return constant;
			}
		}

	}

}
