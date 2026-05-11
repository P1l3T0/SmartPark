package com.tusofia.smartpark.vehicles.rest;

import com.tusofia.smartpark.vehicles.service.VehiclesService;
import com.tusofia.smartpark.vehicles.service.dto.VehicleDTO;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
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
}
