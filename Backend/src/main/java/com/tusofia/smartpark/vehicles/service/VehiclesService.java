package com.tusofia.smartpark.vehicles.service;

import com.tusofia.smartpark.vehicles.service.dto.VehicleDTO;
import java.util.List;

public interface VehiclesService {

    List<VehicleDTO> findAllForCurrentUser();

    void createForCurrentUser(VehicleDTO vehicleDTO);

    void updateForCurrentUser(Long vehicleId, VehicleDTO vehicleDTO);

    void deleteForCurrentUser(Long vehicleId);
}
