package com.tusofia.smartpark.vehicles.service.impl;

import com.tusofia.smartpark.domain.User;
import com.tusofia.smartpark.domain.Vehicle;
import com.tusofia.smartpark.domain.enumeration.VehicleStatus;
import com.tusofia.smartpark.service.UserService;
import com.tusofia.smartpark.vehicles.repository.VehiclesRepository;
import com.tusofia.smartpark.vehicles.service.VehiclesService;
import com.tusofia.smartpark.vehicles.service.dto.VehicleDTO;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

        return vehiclesRepository.findAllByOwnerUserIdAndStatus(currentUser.getId(), VehicleStatus.ACTIVE).stream().map(this::toDto).toList();
    }

    @Override
    @Transactional
    public void updateForCurrentUser(Long vehicleId, VehicleDTO vehicleDTO) {
        if (vehicleDTO == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Vehicle request body is required");
        }
        if (vehicleDTO.id() != null && !vehicleDTO.id().equals(vehicleId)) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Vehicle id cannot be changed");
        }

        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        Vehicle vehicle = vehiclesRepository
            .findOneByIdAndOwnerUserId(vehicleId, currentUser.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Vehicle could not be found"));

        vehicle.setBrand(vehicleDTO.brand());
        vehicle.setModel(vehicleDTO.model());
        vehicle.setRegistrationNumber(vehicleDTO.registrationNumber());
        vehicle.setIsPrimary(vehicleDTO.isPrimary());
        vehiclesRepository.save(vehicle);
    }

    @Override
    @Transactional
    public void deleteForCurrentUser(Long vehicleId) {
        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        Vehicle vehicle = vehiclesRepository
            .findOneByIdAndOwnerUserId(vehicleId, currentUser.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Vehicle could not be found"));

        vehicle.setStatus(VehicleStatus.DISABLED);
        if (Boolean.TRUE.equals(vehicle.getIsPrimary())) {
            vehicle.setIsPrimary(false);
        }
        vehiclesRepository.save(vehicle);
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
