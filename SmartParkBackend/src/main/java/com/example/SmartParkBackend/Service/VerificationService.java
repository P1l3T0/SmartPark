package com.example.SmartParkBackend.Service;

import com.example.SmartParkBackend.DTO.Request.VerifyUserDto;

import java.util.concurrent.CompletableFuture;

public interface VerificationService {
    CompletableFuture<Void> verifyUser(VerifyUserDto verifyUserDto);
    CompletableFuture<Void> resendVerificationCode(String email);
}
