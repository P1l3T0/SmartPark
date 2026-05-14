package com.tusofia.smartpark.service.dto;

import com.tusofia.smartpark.domain.enumeration.VehicleStatus;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.tusofia.smartpark.domain.Vehicle} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VehicleDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant dateCreated;

    @NotNull
    @Size(max = 20)
    private String registrationNumber;

    @NotNull
    @Size(max = 80)
    private String model;

    @NotNull
    @Size(max = 50)
    private String brand;

    private Boolean isPrimary;

    @NotNull
    private VehicleStatus status;

    @NotNull
    private UserProfileDTO owner;

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

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(Boolean isPrimary) {
        this.isPrimary = isPrimary;
    }

    public VehicleStatus getStatus() {
        return status;
    }

    public void setStatus(VehicleStatus status) {
        this.status = status;
    }

    public UserProfileDTO getOwner() {
        return owner;
    }

    public void setOwner(UserProfileDTO owner) {
        this.owner = owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VehicleDTO)) {
            return false;
        }

        VehicleDTO vehicleDTO = (VehicleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, vehicleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VehicleDTO{" +
            "id=" + getId() +
            ", dateCreated='" + getDateCreated() + "'" +
            ", registrationNumber='" + getRegistrationNumber() + "'" +
            ", model='" + getModel() + "'" +
            ", brand='" + getBrand() + "'" +
            ", isPrimary='" + getIsPrimary() + "'" +
            ", status='" + getStatus() + "'" +
            ", owner=" + getOwner() +
            "}";
    }
}
