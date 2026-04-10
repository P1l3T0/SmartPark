package com.example.SmartParkBackend.Controller;

import com.example.SmartParkBackend.DTO.Response.LoginResponseDto;
import com.example.SmartParkBackend.Service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/refresh/")
public class RefreshTokenController {
    private final RefreshTokenService tokenRefreshService;

    public RefreshTokenController(RefreshTokenService tokenRefreshService) {
        this.tokenRefreshService = tokenRefreshService;
    }

    @PostMapping("refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        try {
            LoginResponseDto loginResponse = tokenRefreshService.refresh(request);
            return ResponseEntity.ok(loginResponse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}
