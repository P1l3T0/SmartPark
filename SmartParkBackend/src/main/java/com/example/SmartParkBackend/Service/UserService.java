package com.example.SmartParkBackend.Service;

import com.example.SmartParkBackend.DTO.Response.UserResponseDto;
import com.example.SmartParkBackend.Models.User;

public interface UserService {
    int getCurrentUserId();
    UserResponseDto getCurrentUser();
}
