package com.tusofia.smartpark.domain;

import static com.tusofia.smartpark.domain.BookingTestSamples.*;
import static com.tusofia.smartpark.domain.ParkingSpotTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.tusofia.smartpark.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ParkingSpotTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParkingSpot.class);
        ParkingSpot parkingSpot1 = getParkingSpotSample1();
        ParkingSpot parkingSpot2 = new ParkingSpot();
        assertThat(parkingSpot1).isNotEqualTo(parkingSpot2);

        parkingSpot2.setId(parkingSpot1.getId());
        assertThat(parkingSpot1).isEqualTo(parkingSpot2);

        parkingSpot2 = getParkingSpotSample2();
        assertThat(parkingSpot1).isNotEqualTo(parkingSpot2);
    }

    @Test
    void bookingsTest() {
        ParkingSpot parkingSpot = getParkingSpotRandomSampleGenerator();
        Booking bookingBack = getBookingRandomSampleGenerator();

        parkingSpot.addBookings(bookingBack);
        assertThat(parkingSpot.getBookingses()).containsOnly(bookingBack);
        assertThat(bookingBack.getParkingSpot()).isEqualTo(parkingSpot);

        parkingSpot.removeBookings(bookingBack);
        assertThat(parkingSpot.getBookingses()).doesNotContain(bookingBack);
        assertThat(bookingBack.getParkingSpot()).isNull();

        parkingSpot.bookingses(new HashSet<>(Set.of(bookingBack)));
        assertThat(parkingSpot.getBookingses()).containsOnly(bookingBack);
        assertThat(bookingBack.getParkingSpot()).isEqualTo(parkingSpot);

        parkingSpot.setBookingses(new HashSet<>());
        assertThat(parkingSpot.getBookingses()).doesNotContain(bookingBack);
        assertThat(bookingBack.getParkingSpot()).isNull();
    }
}
