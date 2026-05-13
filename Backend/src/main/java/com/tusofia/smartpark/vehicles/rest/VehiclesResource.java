package com.tusofia.smartpark.vehicles.rest;

import com.tusofia.smartpark.vehicles.service.VehiclesService;
import com.tusofia.smartpark.vehicles.service.dto.VehicleDTO;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/vehicles")
public class VehiclesResource {

    private static final Logger LOG = LoggerFactory.getLogger(VehiclesResource.class);

    private final VehiclesService vehiclesService;

    public VehiclesResource(VehiclesService vehiclesService) {
        this.vehiclesService = vehiclesService;
    }

    @GetMapping("/")
    public List<VehicleDTO> getVehicles() {
        LOG.debug("REST request to get current user's Vehicles");
        return vehiclesService.findAllForCurrentUser();
    }

    @PostMapping("/{vehicleId}")
    public ResponseEntity<Void> updateVehicle(@PathVariable Long vehicleId, @RequestBody VehicleDTO vehicleDTO) {
        LOG.debug("REST request to update current user's Vehicle : {}", vehicleId);
        vehiclesService.updateForCurrentUser(vehicleId, vehicleDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long vehicleId) {
        LOG.debug("REST request to delete current user's Vehicle : {}", vehicleId);
        vehiclesService.deleteForCurrentUser(vehicleId);
        return ResponseEntity.ok().build();
    }
}
