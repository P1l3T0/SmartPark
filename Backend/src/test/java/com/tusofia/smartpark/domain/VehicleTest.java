package com.tusofia.smartpark.domain;

import static com.tusofia.smartpark.domain.BookingTestSamples.*;
import static com.tusofia.smartpark.domain.UserProfileTestSamples.*;
import static com.tusofia.smartpark.domain.VehicleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.tusofia.smartpark.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class VehicleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vehicle.class);
        Vehicle vehicle1 = getVehicleSample1();
        Vehicle vehicle2 = new Vehicle();
        assertThat(vehicle1).isNotEqualTo(vehicle2);

        vehicle2.setId(vehicle1.getId());
        assertThat(vehicle1).isEqualTo(vehicle2);

        vehicle2 = getVehicleSample2();
        assertThat(vehicle1).isNotEqualTo(vehicle2);
    }

    @Test
    void bookingsTest() {
        Vehicle vehicle = getVehicleRandomSampleGenerator();
        Booking bookingBack = getBookingRandomSampleGenerator();

        vehicle.addBookings(bookingBack);
        assertThat(vehicle.getBookingses()).containsOnly(bookingBack);
        assertThat(bookingBack.getVehicle()).isEqualTo(vehicle);

        vehicle.removeBookings(bookingBack);
        assertThat(vehicle.getBookingses()).doesNotContain(bookingBack);
        assertThat(bookingBack.getVehicle()).isNull();

        vehicle.bookingses(new HashSet<>(Set.of(bookingBack)));
        assertThat(vehicle.getBookingses()).containsOnly(bookingBack);
        assertThat(bookingBack.getVehicle()).isEqualTo(vehicle);

        vehicle.setBookingses(new HashSet<>());
        assertThat(vehicle.getBookingses()).doesNotContain(bookingBack);
        assertThat(bookingBack.getVehicle()).isNull();
    }

    @Test
    void ownerTest() {
        Vehicle vehicle = getVehicleRandomSampleGenerator();
        UserProfile userProfileBack = getUserProfileRandomSampleGenerator();

        vehicle.setOwner(userProfileBack);
        assertThat(vehicle.getOwner()).isEqualTo(userProfileBack);

        vehicle.owner(null);
        assertThat(vehicle.getOwner()).isNull();
    }
}
