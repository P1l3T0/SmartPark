package com.example.SmartParkBackend.Service.User;

import com.example.SmartParkBackend.DTO.Response.UserResponseDto;

public interface UserService {
    int getCurrentUserId();
    UserResponseDto getCurrentUser();
}
