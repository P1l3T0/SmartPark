package com.tusofia.smartpark.spots.rest;

import com.tusofia.smartpark.spots.service.ParkingSpotsService;
import com.tusofia.smartpark.spots.service.dto.ParkingSpotDTO;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/parking-spots")
public class ParkingSpotsResource {

    private static final Logger LOG = LoggerFactory.getLogger(ParkingSpotsResource.class);

    private final ParkingSpotsService parkingSpotsService;

    public ParkingSpotsResource(ParkingSpotsService parkingSpotsService) {
        this.parkingSpotsService = parkingSpotsService;
    }

    @GetMapping("")
    public ResponseEntity<List<ParkingSpotDTO>> getParkingSpots(
        @RequestParam Instant startDate,
        @RequestParam(required = false) Instant endDate
    ) {
        LOG.debug("REST request to get parking spots from {} to {}", startDate, endDate);

        List<ParkingSpotDTO> parkingSpots = parkingSpotsService.findAllWithStatus(startDate, endDate);

        return ResponseEntity.ok(parkingSpots);
    }
}
