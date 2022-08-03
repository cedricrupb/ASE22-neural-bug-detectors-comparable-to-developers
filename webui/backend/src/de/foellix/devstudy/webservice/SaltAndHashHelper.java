package de.foellix.devstudy.webservice;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;

public class SaltAndHashHelper {
	private static final String HASH_ALGORITHM = "SHA-256";
	private static final char SEPARATOR = '-';

	private final Random random;
	private final String salt;
	private final Map<String, Set<Participant>> ipMap;
	private final Map<String, Participant> idMap;

	private static SaltAndHashHelper instance = new SaltAndHashHelper();

	private SaltAndHashHelper() {
		this.random = new Random();
		String salt = String.valueOf(this.random.nextInt()) + String.valueOf(System.currentTimeMillis());
		salt = hash(salt);
		this.salt = salt;
		this.ipMap = new HashMap<>();
		this.idMap = new HashMap<>();
	}

	public static SaltAndHashHelper getInstance() {
		return instance;
	}

	public String getSaltedAndHashedIP(String ip) {
		return hash(this.salt + SEPARATOR + ip);
	}

	public Participant getParticipant(String ip, String sessionID) {
		ip = getSaltedAndHashedIP(ip);

		final Set<Participant> pListByIP = this.ipMap.get(ip);
		final Participant pByID = this.idMap.get(sessionID);

		if ((pListByIP == null || !pListByIP.contains(pByID)) && pByID == null) {
			// New participant: Participant unknown by IP and ID
			final Participant p = new Participant(sessionID);
			this.idMap.put(sessionID, p);
			if (!this.ipMap.containsKey(ip)) {
				this.ipMap.put(ip, new HashSet<>());
			}
			this.ipMap.get(ip).add(p);
			for (final Participant pByIP : this.ipMap.get(ip)) {
				if (p != pByIP) {
					p.sameIPas(pByIP);
					pByIP.sameIPas(p);
				}
			}
			return p;
		} else if ((pListByIP != null && pListByIP.contains(pByID)) && pByID != null) {
			// Recognized participant 1/2: Participant known by ID (under this IP)
			return pByID;
		} else if (this.idMap.get(sessionID) != null) {
			// Recognized participant 2/2: Participant known by ID (not under this IP)
			if (!this.ipMap.containsKey(ip)) {
				this.ipMap.put(ip, new HashSet<>());
			}
			this.ipMap.get(ip).add(pByID);
			return pByID;
		} else {
			throw new NullPointerException("Participant data corrupted!");
		}
	}

	private static String hash(String string) {
		try {
			final MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
			final byte[] hash = digest.digest(string.getBytes());
			final BigInteger bigInt = new BigInteger(1, hash);
			String output = bigInt.toString(16);
			output = String.format("%32s", output).replace(' ', '0');
			return output;
		} catch (final NoSuchAlgorithmException e) {
			return null;
		}
	}

	public String getNewSessionID() {
		int random = this.random.nextInt();
		if (random < 0) {
			random = -1 * random;
		}
		return String.valueOf(random) + SEPARATOR + String.valueOf(System.currentTimeMillis());
	}
}