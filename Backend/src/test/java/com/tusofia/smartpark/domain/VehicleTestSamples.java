package com.tusofia.smartpark.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class VehicleTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2L * Integer.MAX_VALUE));

    public static Vehicle getVehicleSample1() {
        return new Vehicle().id(1L).registrationNumber("registrationNumber1").model("model1").brand("brand1");
    }

    public static Vehicle getVehicleSample2() {
        return new Vehicle().id(2L).registrationNumber("registrationNumber2").model("model2").brand("brand2");
    }

    public static Vehicle getVehicleRandomSampleGenerator() {
        return new Vehicle()
            .id(longCount.incrementAndGet())
            .registrationNumber(UUID.randomUUID().toString())
            .model(UUID.randomUUID().toString())
            .brand(UUID.randomUUID().toString());
    }
}
