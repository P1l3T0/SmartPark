package com.example.SmartParkBackend.Service.Impl;

import com.example.SmartParkBackend.DTO.Response.LoginResponseDto;
import com.example.SmartParkBackend.Service.JwtService;
import com.example.SmartParkBackend.Service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public RefreshTokenServiceImpl(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public LoginResponseDto renew(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("No token provided");
        }

        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtService.isTokenValid(token, userDetails)) {
            throw new RuntimeException("Invalid or expired token");
        }

        String newToken = jwtService.generateToken(userDetails);

        return new LoginResponseDto(newToken, jwtService.getJwtExpirationTime());
    }
}
