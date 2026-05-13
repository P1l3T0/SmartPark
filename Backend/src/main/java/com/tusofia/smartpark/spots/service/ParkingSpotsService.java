package com.tusofia.smartpark.spots.service;

import com.tusofia.smartpark.spots.service.dto.ParkingSpotDTO;
import java.time.LocalDateTime;
import java.util.List;

public interface ParkingSpotsService {

    List<ParkingSpotDTO> findAllWithStatus(LocalDateTime startDate, LocalDateTime endDate);
}
