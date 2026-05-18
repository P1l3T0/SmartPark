package com.tusofia.smartpark.spots.service;

import com.tusofia.smartpark.spots.service.dto.ParkingSpotDTO;
import java.time.Instant;
import java.util.List;

public interface ParkingSpotsService {

    List<ParkingSpotDTO> findAllWithStatus(Instant startDate, Instant endDate);
}
