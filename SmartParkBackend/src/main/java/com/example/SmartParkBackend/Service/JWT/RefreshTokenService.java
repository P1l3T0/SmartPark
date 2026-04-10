package com.example.SmartParkBackend.Service.JWT;

import com.example.SmartParkBackend.DTO.Response.LoginResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface RefreshTokenService {
    LoginResponseDto renew(HttpServletRequest request);
}
