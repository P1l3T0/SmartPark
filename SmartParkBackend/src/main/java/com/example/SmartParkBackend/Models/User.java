package com.example.SmartParkBackend.Models;
import com.example.SmartParkBackend.DTO.Response.UserResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
public class User extends BaseModel {
    private String username;
    private String email;
    private byte[] passwordHash;
    private byte[] passwordSalt;

    @Override
    public <T> T toDto(Class<T> type) {
        UserResponse userResponse = new UserResponse(
            this.getId(),
            this.getDateCreated(),
            this.getUsername(),
            this.getEmail()
        );

        return type.cast(userResponse);
    }
}

