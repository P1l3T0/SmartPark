package com.tusofia.smartpark.vehicles.repository;

import com.tusofia.smartpark.domain.Vehicle;
import com.tusofia.smartpark.domain.UserProfile;
import com.tusofia.smartpark.domain.enumeration.VehicleStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiclesRepository extends JpaRepository<Vehicle, Long> {

    @Query(
        """
        select vehicle
        from Vehicle vehicle
        where vehicle.owner.user.id = :userId
          and vehicle.status = :status
        order by vehicle.id
        """
    )
    List<Vehicle> findAllByOwnerUserIdAndStatus(@Param("userId") Long userId, @Param("status") VehicleStatus status);

    @Query("select vehicle from Vehicle vehicle where vehicle.id = :vehicleId and vehicle.owner.user.id = :userId")
    Optional<Vehicle> findOneByIdAndOwnerUserId(@Param("vehicleId") Long vehicleId, @Param("userId") Long userId);

    @Query(
        """
        select userProfile
        from UserProfile userProfile
        join fetch userProfile.user user
        where user.id = :userId
        """
    )
    Optional<UserProfile> findUserProfileByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("update Vehicle vehicle set vehicle.isPrimary = false where vehicle.owner.user.id = :userId")
    void clearPrimaryForOwnerUserId(@Param("userId") Long userId);
}
