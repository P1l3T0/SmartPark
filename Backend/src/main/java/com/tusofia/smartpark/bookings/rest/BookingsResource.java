package com.tusofia.smartpark.bookings.rest;

import com.tusofia.smartpark.bookings.service.BookingsService;
import com.tusofia.smartpark.bookings.service.dto.BookingDTO;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingsResource {

    private static final Logger LOG = LoggerFactory.getLogger(BookingsResource.class);

    private final BookingsService bookingsService;

    public BookingsResource(BookingsService bookingsService) {
        this.bookingsService = bookingsService;
    }

    @GetMapping
    public ResponseEntity<List<BookingDTO>> getBookings() {
        LOG.debug("REST request to get current user's Bookings");
        return ResponseEntity.ok(bookingsService.findAllBookingsForUser());
    }

    @PostMapping
    public ResponseEntity<Void> createBooking(@RequestBody BookingDTO bookingDTO) {
        LOG.debug("REST request to create Booking : {}", bookingDTO);
        bookingsService.createBookingForUser(bookingDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        LOG.debug("REST request to cancel Booking : {}", bookingId);
        bookingsService.cancelBookingForUser(bookingId);
        return ResponseEntity.ok().build();
    }
}
