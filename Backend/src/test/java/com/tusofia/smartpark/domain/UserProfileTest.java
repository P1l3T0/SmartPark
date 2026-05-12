package com.tusofia.smartpark.domain;

import static com.tusofia.smartpark.domain.BookingTestSamples.*;
import static com.tusofia.smartpark.domain.UserProfileTestSamples.*;
import static com.tusofia.smartpark.domain.VehicleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.tusofia.smartpark.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class UserProfileTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProfile.class);
        UserProfile userProfile1 = getUserProfileSample1();
        UserProfile userProfile2 = new UserProfile();
        assertThat(userProfile1).isNotEqualTo(userProfile2);

        userProfile2.setId(userProfile1.getId());
        assertThat(userProfile1).isEqualTo(userProfile2);

        userProfile2 = getUserProfileSample2();
        assertThat(userProfile1).isNotEqualTo(userProfile2);
    }

    @Test
    void vehiclesTest() {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        Vehicle vehicleBack = getVehicleRandomSampleGenerator();

        userProfile.addVehicles(vehicleBack);
        assertThat(userProfile.getVehicleses()).containsOnly(vehicleBack);
        assertThat(vehicleBack.getOwner()).isEqualTo(userProfile);

        userProfile.removeVehicles(vehicleBack);
        assertThat(userProfile.getVehicleses()).doesNotContain(vehicleBack);
        assertThat(vehicleBack.getOwner()).isNull();

        userProfile.vehicleses(new HashSet<>(Set.of(vehicleBack)));
        assertThat(userProfile.getVehicleses()).containsOnly(vehicleBack);
        assertThat(vehicleBack.getOwner()).isEqualTo(userProfile);

        userProfile.setVehicleses(new HashSet<>());
        assertThat(userProfile.getVehicleses()).doesNotContain(vehicleBack);
        assertThat(vehicleBack.getOwner()).isNull();
    }

    @Test
    void bookingsTest() {
        UserProfile userProfile = getUserProfileRandomSampleGenerator();
        Booking bookingBack = getBookingRandomSampleGenerator();

        userProfile.addBookings(bookingBack);
        assertThat(userProfile.getBookingses()).containsOnly(bookingBack);
        assertThat(bookingBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.removeBookings(bookingBack);
        assertThat(userProfile.getBookingses()).doesNotContain(bookingBack);
        assertThat(bookingBack.getUserProfile()).isNull();

        userProfile.bookingses(new HashSet<>(Set.of(bookingBack)));
        assertThat(userProfile.getBookingses()).containsOnly(bookingBack);
        assertThat(bookingBack.getUserProfile()).isEqualTo(userProfile);

        userProfile.setBookingses(new HashSet<>());
        assertThat(userProfile.getBookingses()).doesNotContain(bookingBack);
        assertThat(bookingBack.getUserProfile()).isNull();
    }
}
