package com.example.SmartParkBackend.Models;
import com.example.SmartParkBackend.DTO.Response.UserResponseDto;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User extends BaseModel implements UserDetails {
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "verifcationCode")
    private String verificationCode;

    @Column(name = "verifcationExpiration")
    private LocalDateTime verificationCodeExpiresAt;

    @Column(name = "enabled")
    private boolean enabled;

    public User(String username, String email, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public User() {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public <T> T toDto(Class<T> type) {
        UserResponseDto userResponse = new UserResponseDto(
            this.getId(),
            this.getDateCreated(),
            this.getUsername(),
            this.getEmail()
        );

        return type.cast(userResponse);
    }
}

