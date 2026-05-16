package com.tusofia.smartpark.bookings.service.dto;

import java.time.Instant;

public record BookingDTO(
    Long bookingId,
    String vehicleRegistrationNumber,
    Long parkingSpotId,
    Instant startTime,
    Instant endTime,
    Boolean isCancelled
) {}
