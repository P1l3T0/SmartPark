package com.example.SmartParkBackend.Controller;

import com.example.SmartParkBackend.DTO.Request.EmailDto;
import com.example.SmartParkBackend.DTO.Request.VerifyUserDto;
import com.example.SmartParkBackend.Service.VerificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/verification/")
public class VerificationController {
    private final VerificationService verificationService;

    public VerificationController(VerificationService verificationService) {
        this.verificationService = verificationService;
    }

    @PostMapping("verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            verificationService.verifyUser(verifyUserDto).join();
            return ResponseEntity.ok("Account Verified Successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PostMapping("resend")
    public ResponseEntity<?> resendCode(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            verificationService.resendVerificationCode(verifyUserDto.getEmail()).join();
            return ResponseEntity.ok("Verification Code Sent");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
