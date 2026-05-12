package com.tusofia.smartpark.spots.repository;

import com.tusofia.smartpark.domain.Booking;
import com.tusofia.smartpark.domain.ParkingSpot;
import com.tusofia.smartpark.domain.enumeration.BookingStatus;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingSpotsRepository extends JpaRepository<ParkingSpot, Long> {

    List<ParkingSpot> findAllByOrderBySlotNumberAsc();

    @Query(
        """
        select booking
        from Booking booking
        join fetch booking.parkingSpot parkingSpot
        join fetch booking.userProfile userProfile
        join fetch userProfile.user user
        where booking.status = :status
          and booking.startDate <= :startDate
          and booking.endDate >= :startDate
        """
    )
    List<Booking> findConfirmedBookingsContainingDate(
        @Param("startDate") Instant startDate,
        @Param("status") BookingStatus status
    );

    @Query(
        """
        select booking
        from Booking booking
        join fetch booking.parkingSpot parkingSpot
        join fetch booking.userProfile userProfile
        join fetch userProfile.user user
        where booking.status = :status
          and booking.startDate < :endDate
          and booking.endDate > :startDate
        """
    )
    List<Booking> findConfirmedBookingsOverlappingPeriod(
        @Param("startDate") Instant startDate,
        @Param("endDate") Instant endDate,
        @Param("status") BookingStatus status
    );
}
