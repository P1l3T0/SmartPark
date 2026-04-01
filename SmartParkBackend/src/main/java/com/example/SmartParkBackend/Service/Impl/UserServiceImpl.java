package com.example.SmartParkBackend.Service.Impl;
import com.example.SmartParkBackend.DTO.Response.UserResponse;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Service.UserService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public CompletableFuture<UserResponse> getCurrentUser() {
        return null;
    }
}
