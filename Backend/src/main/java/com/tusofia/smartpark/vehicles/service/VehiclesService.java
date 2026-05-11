package com.tusofia.smartpark.vehicles.service;

import com.tusofia.smartpark.vehicles.service.dto.VehicleDTO;
import java.util.List;

public interface VehiclesService {

    List<VehicleDTO> findAllForCurrentUser();

    void updateForCurrentUser(Long vehicleId, VehicleDTO vehicleDTO);
}
