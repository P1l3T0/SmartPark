package com.example.SmartParkBackend.Controller;

import com.example.SmartParkBackend.DTO.Request.LoginDto;
import com.example.SmartParkBackend.DTO.Request.RegisterDto;
import com.example.SmartParkBackend.DTO.Response.LoginResponseDto;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Service.AuthService;
import com.example.SmartParkBackend.Service.JwtService;
import com.example.SmartParkBackend.Service.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/auth/")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthService authService;

    private final ValidationService validationService;

    public AuthenticationController(JwtService jwtService, AuthService authService, ValidationService validationService) {
        this.jwtService = jwtService;
        this.authService = authService;
        this.validationService = validationService;
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        try {
            validationService.validateRegistration(registerDto);
            authService.register(registerDto);
            return ResponseEntity.ok("Register successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            User user = authService.login(loginDto).join();
            String jwtToken = jwtService.generateToken(user);
            LoginResponseDto response = new LoginResponseDto(jwtToken, jwtService.getJwtExpirationTime());

            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}
