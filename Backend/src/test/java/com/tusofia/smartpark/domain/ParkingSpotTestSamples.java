package com.tusofia.smartpark.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ParkingSpotTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2L * Integer.MAX_VALUE));

    public static ParkingSpot getParkingSpotSample1() {
        return new ParkingSpot().id(1L).slotNumber("slotNumber1");
    }

    public static ParkingSpot getParkingSpotSample2() {
        return new ParkingSpot().id(2L).slotNumber("slotNumber2");
    }

    public static ParkingSpot getParkingSpotRandomSampleGenerator() {
        return new ParkingSpot().id(longCount.incrementAndGet()).slotNumber(UUID.randomUUID().toString());
    }
}
