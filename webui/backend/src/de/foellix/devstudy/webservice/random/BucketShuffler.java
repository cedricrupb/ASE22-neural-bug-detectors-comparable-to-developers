package de.foellix.devstudy.webservice.random;

import java.util.Random;

public class BucketShuffler {

    private int bucketSize;
    private int maxNumber;
    private int repeats;

    private int[] bucket;

    private int currentPos     = 0;
    private int currentBucket  = 0;
    private int currentRepeats = 0;

    private Random rnd = new Random();

    public BucketShuffler(int bucketSize, int maxNumber, int repeats) {
        this.bucketSize = bucketSize;
        this.maxNumber = maxNumber;
        this.repeats = repeats;
        this.initBucket();
    }

    private static void swap(int[] a, int pos1, int pos2){
        int tmp = a[pos1];
        a[pos1] = a[pos2];
        a[pos2] = tmp;
    }

    private static void randomPerm(int[] a, Random rnd){
        for(int i = a.length; i > 1; i--){
            swap(a, i - 1, rnd.nextInt(i));
        }
    }

    
    private void initBucket(){
       
        int startOffset  = this.currentBucket * this.bucketSize;
        int bucketLength = Math.min(this.bucketSize, this.maxNumber - startOffset);

        this.bucket = new int[bucketLength];
        for(int i = 0; i < bucketLength; i += 1){
            this.bucket[i] = startOffset + i;
        }

        BucketShuffler.randomPerm(this.bucket, this.rnd);

    }


    private void nextBucket(){
        if(this.currentRepeats >= this.repeats){
            this.currentBucket += 1;
            this.currentRepeats = 0;

            if(this.currentBucket * this.bucketSize >= this.maxNumber){
                this.currentBucket = 0; // Repeat from start if done with everything
            }

        } else {
            this.currentRepeats += 1;
        }
        this.initBucket();
    }


    public int nextInt(){
        if(this.currentPos >= this.bucket.length){
            nextBucket();
            this.currentPos = 0;
        }
        this.currentPos += 1;
        return this.bucket[this.currentPos - 1];
    }

    public void rejectInt(int x){
        if(this.bucket[this.currentPos - 1] == x){
            this.currentPos -= 1;
        }
    }
    
}
