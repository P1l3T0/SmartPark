package com.example.SmartParkBackend.DTO.Request;

import lombok.Getter;

@Getter
public class VerifyUserDto {
    private String email;
    private String verificationCode;
}
