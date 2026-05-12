package com.tusofia.smartpark.service.dto;

import com.tusofia.smartpark.domain.enumeration.BookingStatus;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.tusofia.smartpark.domain.Booking} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BookingDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant startDate;

    @NotNull
    private Instant endDate;

    @NotNull
    private Instant dateCreated;

    @NotNull
    private BookingStatus status;

    @NotNull
    private UserProfileDTO userProfile;

    @NotNull
    private VehicleDTO vehicle;

    @NotNull
    private ParkingSpotDTO parkingSpot;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public UserProfileDTO getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfileDTO userProfile) {
        this.userProfile = userProfile;
    }

    public VehicleDTO getVehicle() {
        return vehicle;
    }

    public void setVehicle(VehicleDTO vehicle) {
        this.vehicle = vehicle;
    }

    public ParkingSpotDTO getParkingSpot() {
        return parkingSpot;
    }

    public void setParkingSpot(ParkingSpotDTO parkingSpot) {
        this.parkingSpot = parkingSpot;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookingDTO)) {
            return false;
        }

        BookingDTO bookingDTO = (BookingDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bookingDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookingDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", status='" + getStatus() + "'" +
            ", userProfile=" + getUserProfile() +
            ", vehicle=" + getVehicle() +
            ", parkingSpot=" + getParkingSpot() +
            "}";
    }
}
