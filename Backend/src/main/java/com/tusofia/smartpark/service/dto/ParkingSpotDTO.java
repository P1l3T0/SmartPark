package com.tusofia.smartpark.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.tusofia.smartpark.domain.ParkingSpot} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ParkingSpotDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant dateCreated;

    @NotNull
    @Size(max = 20)
    private String slotNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getSlotNumber() {
        return slotNumber;
    }

    public void setSlotNumber(String slotNumber) {
        this.slotNumber = slotNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParkingSpotDTO)) {
            return false;
        }

        ParkingSpotDTO parkingSpotDTO = (ParkingSpotDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, parkingSpotDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParkingSpotDTO{" +
            "id=" + getId() +
            ", dateCreated='" + getDateCreated() + "'" +
            ", slotNumber='" + getSlotNumber() + "'" +
            "}";
    }
}
