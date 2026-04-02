package com.example.SmartParkBackend.Controller;

import com.example.SmartParkBackend.DTO.Request.LoginDto;
import com.example.SmartParkBackend.DTO.Request.RegisterDto;
import com.example.SmartParkBackend.DTO.Request.VerifyUserDto;
import com.example.SmartParkBackend.DTO.Response.LoginResponseDto;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Service.Impl.AuthenticationService;
import com.example.SmartParkBackend.Service.Impl.JwtServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/")
public class AuthenticationController {
    private final JwtServiceImpl jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtServiceImpl jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("register")
    public ResponseEntity<User> register(@RequestBody RegisterDto registerDto) {
        User user = authenticationService.registerAsync(registerDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            User user = authenticationService.authenticate(loginDto);
            String jwtToken =  jwtService.generateToken(user);
            LoginResponseDto response = new LoginResponseDto(jwtToken, jwtService.getJwtExpirationTime());

            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @PostMapping("verify")
    public ResponseEntity<?> verify(@RequestBody VerifyUserDto  verifyUserDto) {
        try {
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account Verified Successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("resend")
    public ResponseEntity<?> resend(@RequestBody String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification Code Sent");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
