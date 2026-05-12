package com.tusofia.smartpark.bookings.service.impl;

import com.tusofia.smartpark.bookings.repository.BookingsRepository;
import com.tusofia.smartpark.bookings.service.BookingsService;
import com.tusofia.smartpark.bookings.service.dto.BookingDTO;
import com.tusofia.smartpark.domain.Booking;
import com.tusofia.smartpark.domain.User;
import com.tusofia.smartpark.domain.enumeration.BookingStatus;
import com.tusofia.smartpark.service.UserService;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    public List<BookingDTO> findAllForCurrentUser() {
        User currentUser = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current user could not be found"));

        return bookingsRepository.findAllByUserId(currentUser.getId()).stream().map(this::toDto).toList();
    }

    private BookingDTO toDto(Booking booking) {
        return new BookingDTO(
            booking.getVehicle().getRegistrationNumber(),
            booking.getParkingSpot().getSlotNumber(),
            toLocalDateTime(booking.getStartDate()),
            toLocalDateTime(booking.getEndDate()),
            BookingStatus.CANCELLED.equals(booking.getStatus())
        );
    }

    private LocalDateTime toLocalDateTime(Instant instant) {
        return LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
    }
}
