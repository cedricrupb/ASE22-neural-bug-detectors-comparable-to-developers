package de.foellix.devstudy.webservice.helper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class Helper {
	public static void msg(String msg) {
		msg(msg, true);
	}

	public static void msg(String msg, boolean newLine) {
		System.out.println(msg);
		if (newLine) {
			newLine();
		}
	}

	public static void info(String msg) {
		info(msg, true);
	}

	public static void info(String msg, boolean newLine) {
		System.out.println("INFO: " + msg);
		if (newLine) {
			newLine();
		}
	}

	public static void warning(String msg) {
		warning(msg, true);
	}

	public static void warning(String msg, boolean newLine) {
		System.out.println("WARNING: " + msg);
		if (newLine) {
			newLine();
		}
	}

	public static void error(String msg) {
		error(msg, true);
	}

	public static void error(String msg, boolean newLine) {
		System.err.println("ERROR: " + msg);
		if (newLine) {
			newLine();
		}
	}

	public static void newLine() {
		System.out.print("> ");
	}

	public static String getIp() throws IOException {
		final URL whatismyip = new URL("http://checkip.amazonaws.com");
		BufferedReader in = null;
		try {
			in = new BufferedReader(new InputStreamReader(whatismyip.openStream()));
			final String ip = in.readLine();
			in.close();
			return ip;
		} finally {
			if (in != null) {
				in.close();
			}
		}
	}
}