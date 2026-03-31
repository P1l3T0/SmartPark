package com.example.SmartParkBackend.Service;

import com.example.SmartParkBackend.DTO.Request.UserRequest;
import com.example.SmartParkBackend.DTO.Response.UserResponse;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

public interface UserService {
    CompletableFuture<UserResponse> getCurrentUser();
}
