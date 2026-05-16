package com.tusofia.smartpark.bookings.repository;

import com.tusofia.smartpark.domain.Booking;
import com.tusofia.smartpark.domain.ParkingSpot;
import com.tusofia.smartpark.domain.UserProfile;
import com.tusofia.smartpark.domain.Vehicle;
import com.tusofia.smartpark.domain.enumeration.BookingStatus;
import com.tusofia.smartpark.domain.enumeration.VehicleStatus;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingsRepository extends JpaRepository<Booking, Long> {

    @Query(
        """
        select booking
        from Booking booking
        join fetch booking.vehicle vehicle
        join fetch booking.parkingSpot parkingSpot
        join fetch booking.userProfile userProfile
        join fetch userProfile.user user
        where user.id = :userId
        order by booking.startDate desc, booking.id desc
        """
    )
    List<Booking> findAllByUserId(@Param("userId") Long userId);

    @Query(
        """
        select booking
        from Booking booking
        join fetch booking.userProfile userProfile
        join fetch userProfile.user user
        where booking.id = :bookingId
          and user.id = :userId
        """
    )
    Optional<Booking> findOneByIdAndUserId(@Param("bookingId") Long bookingId, @Param("userId") Long userId);

    @Query(
        """
        select userProfile
        from UserProfile userProfile
        join fetch userProfile.user user
        where user.id = :userId
        """
    )
    Optional<UserProfile> findUserProfileByUserId(@Param("userId") Long userId);

    @Query(
        """
        select vehicle
        from Vehicle vehicle
        join fetch vehicle.owner owner
        join fetch owner.user user
        where user.id = :userId
          and lower(vehicle.registrationNumber) = lower(:registrationNumber)
          and vehicle.status = :status
        """
    )
    Optional<Vehicle> findVehicleByRegistrationNumberAndOwnerUserId(
        @Param("registrationNumber") String registrationNumber,
        @Param("userId") Long userId,
        @Param("status") VehicleStatus status
    );

    @Query("select parkingSpot from ParkingSpot parkingSpot where parkingSpot.slotNumber = :slotNumber")
    Optional<ParkingSpot> findOneParkingSpotBySlotNumber(@Param("slotNumber") String slotNumber);

    @Query("select parkingSpot from ParkingSpot parkingSpot where parkingSpot.id = :parkingSpotId")
    Optional<ParkingSpot> findOneParkingSpotById(@Param("parkingSpotId") Long parkingSpotId);

    @Query(
        """
        select count(booking) > 0
        from Booking booking
        where booking.parkingSpot.id = :parkingSpotId
          and booking.status = :status
          and booking.startDate < :endDate
          and booking.endDate > :startDate
        """
    )
    boolean existsParkingSpotBookingOverlapping(
        @Param("parkingSpotId") Long parkingSpotId,
        @Param("startDate") Instant startDate,
        @Param("endDate") Instant endDate,
        @Param("status") BookingStatus status
    );

    @Query(
        """
        select count(booking) > 0
        from Booking booking
        where booking.vehicle.id = :vehicleId
          and booking.status = :status
          and booking.startDate < :endDate
          and booking.endDate > :startDate
        """
    )
    boolean existsVehicleBookingOverlapping(
        @Param("vehicleId") Long vehicleId,
        @Param("startDate") Instant startDate,
        @Param("endDate") Instant endDate,
        @Param("status") BookingStatus status
    );
}
