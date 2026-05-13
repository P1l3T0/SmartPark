package com.tusofia.smartpark.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tusofia.smartpark.domain.enumeration.VehicleStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Vehicle.
 */
@Entity
@Table(name = "vehicle")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Vehicle implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_created", nullable = false)
    private Instant dateCreated;

    @NotNull
    @Size(max = 20)
    @Column(name = "registration_number", length = 20, nullable = false)
    private String registrationNumber;

    @NotNull
    @Size(max = 80)
    @Column(name = "model", length = 80, nullable = false)
    private String model;

    @NotNull
    @Size(max = 50)
    @Column(name = "brand", length = 50, nullable = false)
    private String brand;

    @Column(name = "is_primary")
    private Boolean isPrimary;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private VehicleStatus status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    @JsonIgnoreProperties(value = { "userProfile", "vehicle", "parkingSpot" }, allowSetters = true)
    private Set<Booking> bookingses = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "user", "vehicleses", "bookingses" }, allowSetters = true)
    private UserProfile owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Vehicle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateCreated() {
        return this.dateCreated;
    }

    public Vehicle dateCreated(Instant dateCreated) {
        this.setDateCreated(dateCreated);
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getRegistrationNumber() {
        return this.registrationNumber;
    }

    public Vehicle registrationNumber(String registrationNumber) {
        this.setRegistrationNumber(registrationNumber);
        return this;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getModel() {
        return this.model;
    }

    public Vehicle model(String model) {
        this.setModel(model);
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return this.brand;
    }

    public Vehicle brand(String brand) {
        this.setBrand(brand);
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Boolean getIsPrimary() {
        return this.isPrimary;
    }

    public Vehicle isPrimary(Boolean isPrimary) {
        this.setIsPrimary(isPrimary);
        return this;
    }

    public void setIsPrimary(Boolean isPrimary) {
        this.isPrimary = isPrimary;
    }

    public VehicleStatus getStatus() {
        return this.status;
    }

    public Vehicle status(VehicleStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(VehicleStatus status) {
        this.status = status;
    }

    public Set<Booking> getBookingses() {
        return this.bookingses;
    }

    public void setBookingses(Set<Booking> bookings) {
        if (this.bookingses != null) {
            this.bookingses.forEach(i -> i.setVehicle(null));
        }
        if (bookings != null) {
            bookings.forEach(i -> i.setVehicle(this));
        }
        this.bookingses = bookings;
    }

    public Vehicle bookingses(Set<Booking> bookings) {
        this.setBookingses(bookings);
        return this;
    }

    public Vehicle addBookings(Booking booking) {
        this.bookingses.add(booking);
        booking.setVehicle(this);
        return this;
    }

    public Vehicle removeBookings(Booking booking) {
        this.bookingses.remove(booking);
        booking.setVehicle(null);
        return this;
    }

    public UserProfile getOwner() {
        return this.owner;
    }

    public void setOwner(UserProfile userProfile) {
        this.owner = userProfile;
    }

    public Vehicle owner(UserProfile userProfile) {
        this.setOwner(userProfile);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehicle)) {
            return false;
        }
        return getId() != null && getId().equals(((Vehicle) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", dateCreated='" + getDateCreated() + "'" +
            ", registrationNumber='" + getRegistrationNumber() + "'" +
            ", model='" + getModel() + "'" +
            ", brand='" + getBrand() + "'" +
            ", isPrimary='" + getIsPrimary() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
