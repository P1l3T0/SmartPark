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
 * A ParkingSpot.
 */
@Entity
@Table(name = "parking_spot")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ParkingSpot implements Serializable {

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
    @Column(name = "slot_number", length = 20, nullable = false)
    private String slotNumber;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parkingSpot")
    @JsonIgnoreProperties(value = { "userProfile", "vehicle", "parkingSpot" }, allowSetters = true)
    private Set<Booking> bookingses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ParkingSpot id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateCreated() {
        return this.dateCreated;
    }

    public ParkingSpot dateCreated(Instant dateCreated) {
        this.setDateCreated(dateCreated);
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getSlotNumber() {
        return this.slotNumber;
    }

    public ParkingSpot slotNumber(String slotNumber) {
        this.setSlotNumber(slotNumber);
        return this;
    }

    public void setSlotNumber(String slotNumber) {
        this.slotNumber = slotNumber;
    }

    public Set<Booking> getBookingses() {
        return this.bookingses;
    }

    public void setBookingses(Set<Booking> bookings) {
        if (this.bookingses != null) {
            this.bookingses.forEach(i -> i.setParkingSpot(null));
        }
        if (bookings != null) {
            bookings.forEach(i -> i.setParkingSpot(this));
        }
        this.bookingses = bookings;
    }

    public ParkingSpot bookingses(Set<Booking> bookings) {
        this.setBookingses(bookings);
        return this;
    }

    public ParkingSpot addBookings(Booking booking) {
        this.bookingses.add(booking);
        booking.setParkingSpot(this);
        return this;
    }

    public ParkingSpot removeBookings(Booking booking) {
        this.bookingses.remove(booking);
        booking.setParkingSpot(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParkingSpot)) {
            return false;
        }
        return getId() != null && getId().equals(((ParkingSpot) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParkingSpot{" +
            "id=" + getId() +
            ", dateCreated='" + getDateCreated() + "'" +
            ", slotNumber='" + getSlotNumber() + "'" +
            "}";
    }
}
