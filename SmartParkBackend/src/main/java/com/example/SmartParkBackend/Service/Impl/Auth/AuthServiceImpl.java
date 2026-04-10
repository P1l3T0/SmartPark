package com.example.SmartParkBackend.Service.Impl.Auth;

import com.example.SmartParkBackend.DTO.Request.LoginDto;
import com.example.SmartParkBackend.DTO.Request.RegisterDto;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Repo.UserRepo;
import com.example.SmartParkBackend.Service.Auth.AuthService;
import com.example.SmartParkBackend.Service.Validation.VerificationService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.CompletableFuture;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final VerificationService verificationService;

    public AuthServiceImpl(
        UserRepo userRepo,
        PasswordEncoder passwordEncoder,
        AuthenticationManager authenticationManager,
        VerificationService verificationService
    ) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.verificationService = verificationService;
    }

    @Async
    @Override
    public CompletableFuture<Void> register(RegisterDto userRequest) {
        User user = new User(
            userRequest.getUsername(),
            userRequest.getEmail(),
            passwordEncoder.encode(userRequest.getPassword())
        );

        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);

        userRepo.save(user);
        verificationService.sendVerificationEmail(user);
        return CompletableFuture.completedFuture(null);
    }

    @Async
    @Override
    public CompletableFuture<User> login(LoginDto loginDto) {
        User user = userRepo.findByEmail(loginDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified, please verify your email");
        }

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                loginDto.getPassword()
            )
        );

        return CompletableFuture.completedFuture(user);
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
