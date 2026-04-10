package com.example.SmartParkBackend.Service;

import com.example.SmartParkBackend.DTO.Request.LoginDto;
import com.example.SmartParkBackend.DTO.Request.RegisterDto;
import com.example.SmartParkBackend.Models.User;

import java.util.concurrent.CompletableFuture;

public interface AuthService {
    CompletableFuture<User> login(LoginDto loginDto);
    CompletableFuture<Void> register(RegisterDto registerDto);
}
