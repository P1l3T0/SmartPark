package com.example.SmartParkBackend.Service;

import com.example.SmartParkBackend.DTO.Request.RegisterDto;

public interface ValidationService {
    void validateRegistration(RegisterDto registerDto);
}
