package com.tusofia.smartpark.spots.service.impl;

import com.tusofia.smartpark.domain.Booking;
import com.tusofia.smartpark.domain.ParkingSpot;
import com.tusofia.smartpark.domain.User;
import com.tusofia.smartpark.domain.enumeration.BookingStatus;
import com.tusofia.smartpark.service.UserService;
import com.tusofia.smartpark.spots.repository.ParkingSpotsRepository;
import com.tusofia.smartpark.spots.service.ParkingSpotsService;
import com.tusofia.smartpark.spots.service.dto.ParkingSpotDTO;
import com.tusofia.smartpark.spots.service.dto.ParkingSpotStatus;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ParkingSpotsServiceImpl implements ParkingSpotsService {

    private final ParkingSpotsRepository parkingSpotsRepository;

    private final UserService userService;

    public ParkingSpotsServiceImpl(ParkingSpotsRepository parkingSpotsRepository, UserService userService) {
        this.parkingSpotsRepository = parkingSpotsRepository;
        this.userService = userService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ParkingSpotDTO> findAllWithStatus(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "startDate is required");
        }
        if (endDate != null && !endDate.isAfter(startDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "endDate must be after startDate");
        }

        Instant startInstant = toInstant(startDate);
        Instant endInstant = endDate == null ? null : toInstant(endDate);

        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        List<ParkingSpot> parkingSpots = parkingSpotsRepository.findAllByOrderBySlotNumberAsc();
        List<Booking> bookings = endInstant == null
            ? parkingSpotsRepository.findConfirmedBookingsContainingDate(startInstant, BookingStatus.CONFIRMED)
            : parkingSpotsRepository.findConfirmedBookingsOverlappingPeriod(startInstant, endInstant, BookingStatus.CONFIRMED);

        Map<Long, ParkingSpotStatus> statusesByParkingSpotId = buildStatusesByParkingSpotId(bookings, currentUser.getId());

        return parkingSpots
            .stream()
            .map(parkingSpot ->
                new ParkingSpotDTO(
                    parkingSpot.getSlotNumber(),
                    statusesByParkingSpotId.getOrDefault(parkingSpot.getId(), ParkingSpotStatus.FREE)
                )
            )
            .toList();
    }

    private Map<Long, ParkingSpotStatus> buildStatusesByParkingSpotId(List<Booking> bookings, Long currentUserId) {
        Map<Long, ParkingSpotStatus> statusesByParkingSpotId = new HashMap<>();
        for (Booking booking : bookings) {
            Long parkingSpotId = booking.getParkingSpot().getId();
            Long bookingUserId = booking.getUserProfile().getUser().getId();
            ParkingSpotStatus status = bookingUserId.equals(currentUserId)
                ? ParkingSpotStatus.OCCUPIED_BY_ME
                : ParkingSpotStatus.OCCUPIED;

            statusesByParkingSpotId.merge(
                parkingSpotId,
                status,
                (existingStatus, newStatus) ->
                    ParkingSpotStatus.OCCUPIED_BY_ME.equals(existingStatus) ||
                        ParkingSpotStatus.OCCUPIED_BY_ME.equals(newStatus)
                        ? ParkingSpotStatus.OCCUPIED_BY_ME
                        : ParkingSpotStatus.OCCUPIED
            );
        }
        return statusesByParkingSpotId;
    }

    private Instant toInstant(LocalDateTime dateTime) {
        return dateTime.atZone(ZoneId.systemDefault()).toInstant();
    }
}
