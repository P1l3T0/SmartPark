package com.example.SmartParkBackend.Service.Validation;

import com.example.SmartParkBackend.DTO.Request.RegisterDto;

public interface ValidationService {
    void validateRegistration(RegisterDto registerDto);
}
