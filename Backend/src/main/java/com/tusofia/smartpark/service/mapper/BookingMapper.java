package com.tusofia.smartpark.service.mapper;

import com.tusofia.smartpark.domain.Booking;
import com.tusofia.smartpark.domain.ParkingSpot;
import com.tusofia.smartpark.domain.UserProfile;
import com.tusofia.smartpark.domain.Vehicle;
import com.tusofia.smartpark.service.dto.BookingDTO;
import com.tusofia.smartpark.service.dto.ParkingSpotDTO;
import com.tusofia.smartpark.service.dto.UserProfileDTO;
import com.tusofia.smartpark.service.dto.VehicleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Booking} and its DTO {@link BookingDTO}.
 */
@Mapper(componentModel = "spring")
public interface BookingMapper extends EntityMapper<BookingDTO, Booking> {
    @Mapping(target = "userProfile", source = "userProfile", qualifiedByName = "userProfileId")
    @Mapping(target = "vehicle", source = "vehicle", qualifiedByName = "vehicleId")
    @Mapping(target = "parkingSpot", source = "parkingSpot", qualifiedByName = "parkingSpotId")
    BookingDTO toDto(Booking s);

    @Named("userProfileId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserProfileDTO toDtoUserProfileId(UserProfile userProfile);

    @Named("vehicleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    VehicleDTO toDtoVehicleId(Vehicle vehicle);

    @Named("parkingSpotId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ParkingSpotDTO toDtoParkingSpotId(ParkingSpot parkingSpot);
}
