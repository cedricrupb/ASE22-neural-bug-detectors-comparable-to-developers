package de.foellix.devstudy.webservice.config;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

import de.foellix.devstudy.webservice.helper.Helper;

public class Config {
	public static final String PROPERTIES_FILE = "config.properties";

	public static final String ALLOWED_URLS = "allowedURLs";
	public static final String PORT = "port";
	public static final String KEYSTORE_PATH = "keystorePath";
	public static final String KEYSTORE_PASS = "keystorePass";
	public static final String TRUSTSTORE_PATH = "truststorePath";
	public static final String TRUSTSTORE_PASS = "truststorePass";

	private final Properties properties;

	private static Config instance = new Config();

	private Config() {
		this.properties = new Properties();

		try (InputStream input = new FileInputStream(PROPERTIES_FILE)) {
			this.properties.load(input);
		} catch (final IOException e) {
			init();
			Helper.warning(
					"Could not find/read " + PROPERTIES_FILE + ". Creating new one now! (" + e.getMessage() + ")");
		}
	}

	private void init() {
		this.properties.setProperty(ALLOWED_URLS, "http://localhost,https://localhost");
		this.properties.setProperty(PORT, "6112");
		this.properties.setProperty(KEYSTORE_PATH, "keystore_server");
		this.properties.setProperty(KEYSTORE_PASS, "DevStudy#1");
		this.properties.setProperty(TRUSTSTORE_PATH, "truststore_server");
		this.properties.setProperty(TRUSTSTORE_PASS, "DevStudy#1");
		store();
	}

	public static Config getInstance() {
		return instance;
	}

	public Properties getProperties() {
		return this.properties;
	}

	public String getProperty(String name) {
		return this.properties.getProperty(name);
	}

	public void store() {
		try (OutputStream output = new FileOutputStream(PROPERTIES_FILE)) {
			this.properties.store(output, null);
		} catch (final Exception e) {
			Helper.error("Could not write " + PROPERTIES_FILE + ". (" + e.getMessage() + ")");
		}
	}
}