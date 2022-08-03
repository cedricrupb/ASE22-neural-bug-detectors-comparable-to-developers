package de.foellix.devstudy.webservice;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.nio.transport.TCPNIOTransport;
import org.glassfish.grizzly.ssl.SSLContextConfigurator;
import org.glassfish.grizzly.ssl.SSLEngineConfigurator;
import org.glassfish.grizzly.threadpool.ThreadPoolConfig;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;

import de.foellix.devstudy.webservice.config.Config;
import de.foellix.devstudy.webservice.helper.DbHelper;
import de.foellix.devstudy.webservice.helper.Helper;
import de.foellix.devstudy.webservice.tasks.TaskSet;

public class WebService {
	public static boolean enableDB = true;
	public static boolean debugDB = false;

	public static String url;

	private static final String CMD_EXIT = "exit";
	private static final String CMD_QUIT = "quit";
	private static final String CMD_HELP = "help";

	public static void main(String[] args) {
		final List<String> argList = Arrays.asList(args);
		if (argList.contains("-nodb")) {
			enableDB = false;
			System.out.println("Database disabled!");
		}
		if (argList.contains("-debugdb")) {
			debugDB = true;
			System.out.println("Database debugging enabled!");
		}

		// Initialize database connection
		if (enableDB) {
			DbHelper.getInstance();
		}

		// Load taskset
		TaskSet.getInstance();

		// Start server
		final HttpServer server = startServer();
		Helper.msg("Webservice started!\n" + info());

		// Setup
		try (Scanner sc = new Scanner(System.in)) {
			String read;
			do {
				read = sc.nextLine();
				if (read.equals(CMD_HELP)) {
					Helper.msg("Commands: help, exit/quit");
				} else if (!(read.equals(CMD_EXIT) || read.equals(CMD_QUIT))) {
					Helper.msg("Unknown command: " + read + " (Type \"" + CMD_HELP
							+ "\" to see a list of available commands)");
				}
			} while (!(read.equals(CMD_EXIT) || read.equals(CMD_QUIT)));
		} catch (final Exception e) {
			de.foellix.devstudy.webservice.helper.Helper
					.error("Web service unexpectedly stopped! (" + e.getMessage() + ")");
		}

		// Stop server
		server.shutdown();
		Helper.msg("Webservice stopped!", false);
	}

	private static void initUrl(String port) {
		url = "http://0.0.0.0:" + port + "/DevStudy";
	}

	private static String info() {
		String remoteUrl;
		try {
			final String ip = de.foellix.devstudy.webservice.helper.Helper.getIp();
			remoteUrl = (sslActive() ? "https" : "http") + "://" + ip + ":"
					+ Config.getInstance().getProperty(Config.PORT) + "/DevStudy";
		} catch (final IOException e) {
			remoteUrl = "Could not be fetched";
		}
		final String localUrl = (sslActive() ? "https" : "http") + "://localhost:"
				+ Config.getInstance().getProperty(Config.PORT) + "/DevStudy";

		return "\nListening on port " + Config.getInstance().getProperty(Config.PORT) + "\nURLs:\n\t- Local: "
				+ localUrl + ",\n\t- Remote: " + remoteUrl + "\n";
	}

	public static HttpServer startServer() {
		initUrl(Config.getInstance().getProperty(Config.PORT));

		final ResourceConfig rc = new ResourceConfig();
		final Map<String, Object> initParams = new HashMap<>();
		initParams.put(ServerProperties.PROVIDER_PACKAGES, "de.foellix.devstudy.webservice");
		initParams.put(ServerProperties.PROVIDER_CLASSNAMES, "org.glassfish.jersey.media.multipart.MultiPartFeature");
		rc.addProperties(initParams);
		if (!debugDB) {
			Logger.getLogger("org.glassfish").setLevel(Level.OFF);
		}

		final HttpServer grizzly;
		if (sslActive()) {
			final SSLContextConfigurator ssl = new SSLContextConfigurator();
			ssl.setKeyStoreFile(Config.getInstance().getProperty(Config.KEYSTORE_PATH));
			ssl.setKeyStorePass(Config.getInstance().getProperty(Config.KEYSTORE_PASS));
			ssl.setTrustStoreFile(Config.getInstance().getProperty(Config.TRUSTSTORE_PATH));
			ssl.setTrustStorePass(Config.getInstance().getProperty(Config.TRUSTSTORE_PASS));
			grizzly = GrizzlyHttpServerFactory.createHttpServer(URI.create(url), rc, true,
					new SSLEngineConfigurator(ssl).setClientMode(false).setNeedClientAuth(false), false);
		} else {
			grizzly = GrizzlyHttpServerFactory.createHttpServer(URI.create(url), rc, false);
		}

		final TCPNIOTransport transport = grizzly.getListener("grizzly").getTransport();
		final ThreadPoolConfig config = ThreadPoolConfig.defaultConfig().setCorePoolSize(128).setMaxPoolSize(128)
				.setQueueLimit(-1);
		transport.setWorkerThreadPoolConfig(config);

		try {
			grizzly.start();
		} catch (final IOException e) {
			Helper.error("Error occured while starting Grizzly webservice: " + e.getMessage());
		}

		return grizzly;
	}

	private static boolean sslActive() {
		if (Config.getInstance().getProperty(Config.KEYSTORE_PATH) != null
				&& !Config.getInstance().getProperty(Config.KEYSTORE_PATH).isEmpty()
				&& Config.getInstance().getProperty(Config.KEYSTORE_PASS) != null
				&& Config.getInstance().getProperty(Config.TRUSTSTORE_PATH) != null
				&& !Config.getInstance().getProperty(Config.TRUSTSTORE_PATH).isEmpty()
				&& Config.getInstance().getProperty(Config.TRUSTSTORE_PASS) != null) {
			final File keystore = new File(Config.getInstance().getProperty(Config.KEYSTORE_PATH));
			final File truststore = new File(Config.getInstance().getProperty(Config.TRUSTSTORE_PATH));
			if (keystore.exists() && truststore.exists()) {
				return true;
			}
		}
		return false;
	}
}