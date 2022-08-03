package de.foellix.devstudy.webservice.tasks;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import de.foellix.devstudy.webservice.helper.Helper;

public class TaskSet {
	private static final String DEFAULT_DIR = "tasks";

	private String loadingDir;
	private List<TaskIndex> index;

	private static TaskSet instance = new TaskSet();

	private TaskSet() {
		this(DEFAULT_DIR);
	}

	private TaskSet(String targetDir) {
		System.out.print("Loading taskset... ");
		this.loadingDir = targetDir;
		this.initTaskIndex();
		System.out.println("done (Indexed " + this.taskCount() + " tasks)\n");
	}

	public static TaskSet getInstance() {
		return instance;
	}

	private void indexFile(Path filePath) throws IOException {
		long startIndex = 0;
		final RandomAccessFile raf = new RandomAccessFile(filePath.toFile(), "r");

		while (raf.readLine() != null) {
			this.index.add(new TaskIndex(filePath.toString(), startIndex));
			startIndex = raf.getFilePointer();
		}

		raf.close();
	}

	private void initTaskIndex() {
		this.index = new ArrayList<>();

		final File folder = new File(this.loadingDir);
		final File[] listOfFiles = folder.listFiles();

		for (final File file : listOfFiles) {
			if (!file.isFile()) {
				continue;
			}
			if (!file.getPath().endsWith(".jsonl")) {
				continue;
			}

			try {
				this.indexFile(file.toPath());
			} catch (final IOException e) {
				Helper.error("Could not read task index from: " + file.getAbsolutePath());
			}
		}
	}

	public Task getTaskByIndex(int index) {
		try {
			return this.index.get(index).load();
		} catch (final IOException e) {
			return null;
		}
	}

	public int taskCount() {
		return this.index.size();
	}

	private class TaskIndex {
		private String filePath;
		private long fileOffset;

		public TaskIndex(String filePath, long fileOffset) {
			this.filePath = filePath;
			this.fileOffset = fileOffset;
		}

		public Task load() throws IOException {
			final RandomAccessFile raf = new RandomAccessFile(this.filePath, "r");
			raf.seek(this.fileOffset);

			final String jsonLine = raf.readLine();
			final JSONObject jsonObject = new JSONObject(jsonLine);

			raf.close();

			return Task.fromJSON(jsonObject);
		}
	}
}