package com.example.SmartParkBackend.Service.Validation;

import com.example.SmartParkBackend.DTO.Request.VerifyUserDto;
import com.example.SmartParkBackend.Models.User;

import java.util.concurrent.CompletableFuture;

public interface VerificationService {
    CompletableFuture<Void> verifyUser(VerifyUserDto verifyUserDto);
    CompletableFuture<Void> resendVerificationCode(String email);
    void sendVerificationEmail(User user);
}
