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
    public List<ParkingSpotDTO> findAllWithStatus(Instant startDate, Instant endDate) {
        if (startDate == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "startDate is required");
        }
        if (endDate != null && !endDate.isAfter(startDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "endDate must be after startDate");
        }

        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        List<ParkingSpot> parkingSpots = parkingSpotsRepository.findAllByOrderBySlotNumberAsc();
        List<Booking> bookings = endDate == null
            ? parkingSpotsRepository.findConfirmedBookingsContainingDate(startDate, BookingStatus.CONFIRMED)
            : parkingSpotsRepository.findConfirmedBookingsOverlappingPeriod(startDate, endDate, BookingStatus.CONFIRMED);

        Map<Long, SpotInfo> infoByParkingSpotId = buildStatusesByParkingSpotId(bookings, currentUser.getId());

        return parkingSpots
            .stream()
            .map(parkingSpot -> {
                SpotInfo info = infoByParkingSpotId.get(parkingSpot.getId());
                return new ParkingSpotDTO(
                    parkingSpot.getId(),
                    parkingSpot.getSlotNumber(),
                    info != null ? info.status() : ParkingSpotStatus.FREE,
                    info != null ? info.occupiedBy() : null,
                    info != null ? info.bookingId() : null
                );
            })
            .toList();
    }

    private record SpotInfo(ParkingSpotStatus status, String occupiedBy, Long bookingId) {}

    private Map<Long, SpotInfo> buildStatusesByParkingSpotId(List<Booking> bookings, Long currentUserId) {
        Map<Long, SpotInfo> infoByParkingSpotId = new HashMap<>();
        for (Booking booking : bookings) {
            Long parkingSpotId = booking.getParkingSpot().getId();
            Long bookingUserId = booking.getUserProfile().getUser().getId();
            boolean isMine = bookingUserId.equals(currentUserId);
            ParkingSpotStatus status = isMine ? ParkingSpotStatus.OCCUPIED_BY_ME : ParkingSpotStatus.OCCUPIED;
            String occupiedBy = booking.getVehicle().getRegistrationNumber();
            Long bookingId = isMine ? booking.getId() : null;

            infoByParkingSpotId.merge(
                parkingSpotId,
                new SpotInfo(status, occupiedBy, bookingId),
                (existing, incoming) ->
                    ParkingSpotStatus.OCCUPIED_BY_ME.equals(existing.status())
                        ? existing
                        : ParkingSpotStatus.OCCUPIED_BY_ME.equals(incoming.status())
                            ? incoming
                            : existing
            );
        }
        return infoByParkingSpotId;
    }
}
