package com.tusofia.smartpark.bookings.repository;

import com.tusofia.smartpark.domain.Booking;
import java.util.List;
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
}
