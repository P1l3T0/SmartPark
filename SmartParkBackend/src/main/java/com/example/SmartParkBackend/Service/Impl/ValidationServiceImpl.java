package com.example.SmartParkBackend.Service.Impl;

import com.example.SmartParkBackend.DTO.Request.RegisterDto;
import com.example.SmartParkBackend.Exceptions.InvalidCredentialsException;
import com.example.SmartParkBackend.Exceptions.UserAlreadyExistsException;
import com.example.SmartParkBackend.Repo.UserRepo;
import com.example.SmartParkBackend.Service.ValidationService;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class ValidationServiceImpl implements ValidationService {
    private final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$");
    private final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

    private final UserRepo userRepo;

    public ValidationServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public void validateRegistration(RegisterDto registerDto) {
        if (!isEmailValid(registerDto.getEmail())) {
            throw new InvalidCredentialsException("Invalid email format");
        }

        if (!isPasswordValid(registerDto.getPassword())) {
            throw new InvalidCredentialsException(
                "Password must be at least 8 characters and contain uppercase, lowercase, number and special character"
            );
        }

        if (userRepo.findByEmail(registerDto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("A user with this email already exists");
        }

        if (userRepo.findByUsername(registerDto.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("A user with this username already exists");
        }
    }

    private boolean isEmailValid(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    private boolean isPasswordValid(String password) {
        return password != null && PASSWORD_PATTERN.matcher(password).matches();
    }
}
