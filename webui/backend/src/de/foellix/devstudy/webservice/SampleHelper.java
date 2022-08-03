package de.foellix.devstudy.webservice;

import de.foellix.devstudy.webservice.random.BucketShuffler;
import de.foellix.devstudy.webservice.tasks.TaskSet;

public class SampleHelper {

    private static BucketShuffler instance;

    // Hyperparamters
    private static final int MAX_REPEATS = 3;
    private static final int BUCKET_SIZE = 80; // The number of tasks solved by 30 participants if we want 3 rating per task

    public static BucketShuffler getBucketShuffler(){
        
        if(instance == null){
            int taskSetSize = TaskSet.getInstance().taskCount();
            instance = new BucketShuffler(BUCKET_SIZE, taskSetSize - 1, MAX_REPEATS);
        }

        return instance;

    }
    
}
