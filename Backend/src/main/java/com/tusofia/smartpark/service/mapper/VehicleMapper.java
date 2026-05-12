package com.tusofia.smartpark.service.mapper;

import com.tusofia.smartpark.domain.UserProfile;
import com.tusofia.smartpark.domain.Vehicle;
import com.tusofia.smartpark.service.dto.UserProfileDTO;
import com.tusofia.smartpark.service.dto.VehicleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Vehicle} and its DTO {@link VehicleDTO}.
 */
@Mapper(componentModel = "spring")
public interface VehicleMapper extends EntityMapper<VehicleDTO, Vehicle> {
    @Mapping(target = "owner", source = "owner", qualifiedByName = "userProfileId")
    VehicleDTO toDto(Vehicle s);

    @Named("userProfileId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserProfileDTO toDtoUserProfileId(UserProfile userProfile);
}
