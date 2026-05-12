package com.tusofia.smartpark.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserProfile.
 */
@Entity
@Table(name = "user_profile")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserProfile implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 30)
    @Column(name = "phone_number", length = 30)
    private String phoneNumber;

    @Size(max = 500)
    @Column(name = "photo_url", length = 500)
    private String photoUrl;

    @NotNull
    @Column(name = "date_created", nullable = false)
    private Instant dateCreated;

    @Column(name = "date_updated")
    private Instant dateUpdated;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "owner")
    @JsonIgnoreProperties(value = { "bookingses", "owner" }, allowSetters = true)
    private Set<Vehicle> vehicleses = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userProfile")
    @JsonIgnoreProperties(value = { "userProfile", "vehicle", "parkingSpot" }, allowSetters = true)
    private Set<Booking> bookingses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserProfile id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public UserProfile phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhotoUrl() {
        return this.photoUrl;
    }

    public UserProfile photoUrl(String photoUrl) {
        this.setPhotoUrl(photoUrl);
        return this;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Instant getDateCreated() {
        return this.dateCreated;
    }

    public UserProfile dateCreated(Instant dateCreated) {
        this.setDateCreated(dateCreated);
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateUpdated() {
        return this.dateUpdated;
    }

    public UserProfile dateUpdated(Instant dateUpdated) {
        this.setDateUpdated(dateUpdated);
        return this;
    }

    public void setDateUpdated(Instant dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserProfile user(User user) {
        this.setUser(user);
        return this;
    }

    public Set<Vehicle> getVehicleses() {
        return this.vehicleses;
    }

    public void setVehicleses(Set<Vehicle> vehicles) {
        if (this.vehicleses != null) {
            this.vehicleses.forEach(i -> i.setOwner(null));
        }
        if (vehicles != null) {
            vehicles.forEach(i -> i.setOwner(this));
        }
        this.vehicleses = vehicles;
    }

    public UserProfile vehicleses(Set<Vehicle> vehicles) {
        this.setVehicleses(vehicles);
        return this;
    }

    public UserProfile addVehicles(Vehicle vehicle) {
        this.vehicleses.add(vehicle);
        vehicle.setOwner(this);
        return this;
    }

    public UserProfile removeVehicles(Vehicle vehicle) {
        this.vehicleses.remove(vehicle);
        vehicle.setOwner(null);
        return this;
    }

    public Set<Booking> getBookingses() {
        return this.bookingses;
    }

    public void setBookingses(Set<Booking> bookings) {
        if (this.bookingses != null) {
            this.bookingses.forEach(i -> i.setUserProfile(null));
        }
        if (bookings != null) {
            bookings.forEach(i -> i.setUserProfile(this));
        }
        this.bookingses = bookings;
    }

    public UserProfile bookingses(Set<Booking> bookings) {
        this.setBookingses(bookings);
        return this;
    }

    public UserProfile addBookings(Booking booking) {
        this.bookingses.add(booking);
        booking.setUserProfile(this);
        return this;
    }

    public UserProfile removeBookings(Booking booking) {
        this.bookingses.remove(booking);
        booking.setUserProfile(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProfile)) {
            return false;
        }
        return getId() != null && getId().equals(((UserProfile) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProfile{" +
            "id=" + getId() +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", photoUrl='" + getPhotoUrl() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dateUpdated='" + getDateUpdated() + "'" +
            "}";
    }
}
