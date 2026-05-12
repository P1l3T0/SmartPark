package com.tusofia.smartpark.bookings.service.dto;

import java.time.LocalDateTime;

public record BookingDTO(
    String vehicleRegistrationNumber,
    String slotNumber,
    LocalDateTime startTime,
    LocalDateTime endTime,
    boolean isCancelled
) {}
