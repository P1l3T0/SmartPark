package com.tusofia.smartpark.spots.service.dto;

public record ParkingSpotDTO(Long id, String slotNumber, ParkingSpotStatus status, String occupiedBy, Long bookingId) {}
