package com.example.SmartParkBackend.Service.Impl;
import com.example.SmartParkBackend.DTO.Response.UserResponse;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Service.UserService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class UserServiceImpl implements UserService {
    @Async
    @Override
    public CompletableFuture<UserResponse> getCurrentUser() {
        User user = new User("P1l3T0", "vgan3v@gmail.com", new byte[8], new byte[8]);
        UserResponse userResponse = user.toDto(UserResponse.class);

        return CompletableFuture.completedFuture(userResponse);
    }
}
