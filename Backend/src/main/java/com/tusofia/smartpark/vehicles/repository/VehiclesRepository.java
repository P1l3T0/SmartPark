package com.tusofia.smartpark.vehicles.repository;

import com.tusofia.smartpark.domain.Vehicle;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiclesRepository extends JpaRepository<Vehicle, Long> {

    @Query("select vehicle from Vehicle vehicle where vehicle.owner.user.id = :userId order by vehicle.id")
    List<Vehicle> findAllByOwnerUserId(@Param("userId") Long userId);
}
