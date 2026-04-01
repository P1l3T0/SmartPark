package com.example.SmartParkBackend.Models;
import com.example.SmartParkBackend.DTO.Response.UserResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User extends BaseModel implements UserDetails {
    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "verifcation_code")
    private String verificationCode;

    @Column(name = "verifcation_expiration")
    private String verificationExpiration;

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
        UserResponse userResponse = new UserResponse(
            this.getId(),
            this.getDateCreated(),
            this.getUsername(),
            this.getEmail()
        );

        return type.cast(userResponse);
    }
}

