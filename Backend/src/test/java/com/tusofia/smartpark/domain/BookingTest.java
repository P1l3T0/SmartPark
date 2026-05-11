package com.tusofia.smartpark.domain;

import static com.tusofia.smartpark.domain.BookingTestSamples.*;
import static com.tusofia.smartpark.domain.ParkingSpotTestSamples.*;
import static com.tusofia.smartpark.domain.UserProfileTestSamples.*;
import static com.tusofia.smartpark.domain.VehicleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.tusofia.smartpark.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BookingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Booking.class);
        Booking booking1 = getBookingSample1();
        Booking booking2 = new Booking();
        assertThat(booking1).isNotEqualTo(booking2);

        booking2.setId(booking1.getId());
        assertThat(booking1).isEqualTo(booking2);

        booking2 = getBookingSample2();
        assertThat(booking1).isNotEqualTo(booking2);
    }

    @Test
    void userProfileTest() {
        Booking booking = getBookingRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        booking.setUserProfile(userProfileBack);
        assertThat(booking.getUserProfile()).isEqualTo(userProfileBack);

        booking.userProfile(null);
        assertThat(booking.getUserProfile()).isNull();
    }

    @Test
    void vehicleTest() {
        Booking booking = getBookingRandomSampleGenerator();
        Vehicle vehicleBack = getVehicleRandomSampleGenerator();

        booking.setVehicle(vehicleBack);
        assertThat(booking.getVehicle()).isEqualTo(vehicleBack);

        booking.vehicle(null);
        assertThat(booking.getVehicle()).isNull();
    }

    @Test
    void parkingSpotTest() {
        Booking booking = getBookingRandomSampleGenerator();
        ParkingSpot parkingSpotBack = getParkingSpotRandomSampleGenerator();

        booking.setParkingSpot(parkingSpotBack);
        assertThat(booking.getParkingSpot()).isEqualTo(parkingSpotBack);

        booking.parkingSpot(null);
        assertThat(booking.getParkingSpot()).isNull();
    }
}
