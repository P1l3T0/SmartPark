package com.tusofia.smartpark.bookings.service;

import com.tusofia.smartpark.bookings.service.dto.BookingDTO;
import java.util.List;

public interface BookingsService {

    List<BookingDTO> findAllForCurrentUser();
}
