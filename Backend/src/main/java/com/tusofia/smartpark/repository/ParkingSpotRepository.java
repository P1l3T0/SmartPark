package com.tusofia.smartpark.repository;

import com.tusofia.smartpark.domain.ParkingSpot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ParkingSpot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {}
