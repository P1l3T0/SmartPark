package com.example.SmartParkBackend.Service;

import com.example.SmartParkBackend.DTO.Response.LoginResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface RefreshTokenService {
    LoginResponseDto refresh(HttpServletRequest request);
}
