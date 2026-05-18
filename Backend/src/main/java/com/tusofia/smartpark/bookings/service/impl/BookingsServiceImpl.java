package com.tusofia.smartpark.bookings.service.impl;

import com.tusofia.smartpark.bookings.repository.BookingsRepository;
import com.tusofia.smartpark.bookings.service.BookingsService;
import com.tusofia.smartpark.bookings.service.dto.BookingDTO;
import com.tusofia.smartpark.domain.Booking;
import com.tusofia.smartpark.domain.ParkingSpot;
import com.tusofia.smartpark.domain.User;
import com.tusofia.smartpark.domain.UserProfile;
import com.tusofia.smartpark.domain.Vehicle;
import com.tusofia.smartpark.domain.enumeration.BookingStatus;
import com.tusofia.smartpark.domain.enumeration.VehicleStatus;
import com.tusofia.smartpark.service.UserService;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookingsServiceImpl implements BookingsService {

    private final BookingsRepository bookingsRepository;

    private final UserService userService;

    public BookingsServiceImpl(BookingsRepository bookingsRepository, UserService userService) {
        this.bookingsRepository = bookingsRepository;
        this.userService = userService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> findAllBookingsForUser() {
        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        return bookingsRepository.findAllByUserId(currentUser.getId()).stream().map(this::toDto).toList();
    }

    @Override
    @Transactional
    public void createBookingForUser(BookingDTO bookingDTO) {
        validateBookingRequest(bookingDTO);

        Instant startInstant = bookingDTO.startTime();
        Instant endInstant = bookingDTO.endTime();
        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        UserProfile userProfile = bookingsRepository
            .findUserProfileByUserId(currentUser.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Current user profile could not be found"));

        Vehicle vehicle = bookingsRepository
            .findVehicleByRegistrationNumberAndOwnerUserId(bookingDTO.vehicleRegistrationNumber(), currentUser.getId(), VehicleStatus.ACTIVE)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Active vehicle does not belong to current user"));

        ParkingSpot parkingSpot = bookingsRepository
            .findOneParkingSpotById(bookingDTO.parkingSpotId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Parking spot could not be found"));

        if (bookingsRepository.existsParkingSpotBookingOverlapping
            (parkingSpot.getId(), startInstant, endInstant, BookingStatus.CONFIRMED)
        ) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Parking spot is not free for this period");
        }

        if (bookingsRepository.existsVehicleBookingOverlapping(vehicle.getId(), startInstant, endInstant, BookingStatus.CONFIRMED)) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Vehicle already has a booking for this period");
        }

        Booking booking = new Booking();
        booking.setUserProfile(userProfile);
        booking.setVehicle(vehicle);
        booking.setParkingSpot(parkingSpot);
        booking.setStartDate(startInstant);
        booking.setEndDate(endInstant);
        booking.setDateCreated(Instant.now());
        booking.setStatus(BookingStatus.CONFIRMED);
        bookingsRepository.save(booking);
    }

    @Override
    @Transactional
    public void cancelBookingForUser(Long bookingId) {
        if (bookingId == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "bookingId is required");
        }

        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        Booking booking = bookingsRepository
            .findOneByIdAndUserId(bookingId, currentUser.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Booking could not be found"));

        booking.setStatus(BookingStatus.CANCELLED);
        bookingsRepository.save(booking);
    }

    private void validateBookingRequest(BookingDTO bookingDTO) {
        if (bookingDTO == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Booking request body is required");
        }
        if (bookingDTO.parkingSpotId() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "parkingSpotId is required");
        }
        if (bookingDTO.vehicleRegistrationNumber() == null || bookingDTO.vehicleRegistrationNumber().isBlank()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "vehicleRegistrationNumber is required");
        }
        if (bookingDTO.startTime() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "startTime is required");
        }
        if (bookingDTO.endTime() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "endTime is required");
        }
        if (!bookingDTO.endTime().isAfter(bookingDTO.startTime())) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "endTime must be after startTime");
        }
    }

    private BookingDTO toDto(Booking booking) {
        return new BookingDTO(
            booking.getId(),
            booking.getVehicle().getRegistrationNumber(),
            booking.getParkingSpot().getId(),
            booking.getStartDate(),
            booking.getEndDate(),
            BookingStatus.CANCELLED.equals(booking.getStatus())
        );
    }
}
