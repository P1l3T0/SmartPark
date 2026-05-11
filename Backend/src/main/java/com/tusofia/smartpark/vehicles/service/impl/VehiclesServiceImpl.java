package com.tusofia.smartpark.vehicles.service.impl;

import com.tusofia.smartpark.domain.User;
import com.tusofia.smartpark.domain.Vehicle;
import com.tusofia.smartpark.service.UserService;
import com.tusofia.smartpark.vehicles.repository.VehiclesRepository;
import com.tusofia.smartpark.vehicles.service.VehiclesService;
import com.tusofia.smartpark.vehicles.service.dto.VehicleDTO;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class VehiclesServiceImpl implements VehiclesService {

    private final VehiclesRepository vehiclesRepository;

    private final UserService userService;

    public VehiclesServiceImpl(VehiclesRepository vehiclesRepository, UserService userService) {
        this.vehiclesRepository = vehiclesRepository;
        this.userService = userService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleDTO> findAllForCurrentUser() {
        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        return vehiclesRepository.findAllByOwnerUserId(currentUser.getId()).stream().map(this::toDto).toList();
    }

    private VehicleDTO toDto(Vehicle vehicle) {
        return new VehicleDTO(
            vehicle.getId(),
            vehicle.getBrand(),
            vehicle.getModel(),
            vehicle.getRegistrationNumber(),
            Boolean.TRUE.equals(vehicle.getIsPrimary())
        );
    }
}
