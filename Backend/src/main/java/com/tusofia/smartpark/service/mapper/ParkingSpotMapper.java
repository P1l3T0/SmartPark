package com.tusofia.smartpark.service.mapper;

import com.tusofia.smartpark.domain.ParkingSpot;
import com.tusofia.smartpark.service.dto.ParkingSpotDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ParkingSpot} and its DTO {@link ParkingSpotDTO}.
 */
@Mapper(componentModel = "spring")
public interface ParkingSpotMapper extends EntityMapper<ParkingSpotDTO, ParkingSpot> {}
