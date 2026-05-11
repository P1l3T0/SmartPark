package com.tusofia.smartpark.service.mapper;

import static com.tusofia.smartpark.domain.ParkingSpotAsserts.*;
import static com.tusofia.smartpark.domain.ParkingSpotTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ParkingSpotMapperTest {

    private ParkingSpotMapper parkingSpotMapper;

    @BeforeEach
    void setUp() {
        parkingSpotMapper = new ParkingSpotMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getParkingSpotSample1();
        var actual = parkingSpotMapper.toEntity(parkingSpotMapper.toDto(expected));
        assertParkingSpotAllPropertiesEquals(expected, actual);
    }
}
