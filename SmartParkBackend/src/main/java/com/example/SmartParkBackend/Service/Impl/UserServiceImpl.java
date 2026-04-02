package com.example.SmartParkBackend.Service.Impl;
import com.example.SmartParkBackend.DTO.Response.UserResponseDto;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Repo.UserRepo;
import com.example.SmartParkBackend.Service.EmailService;
import com.example.SmartParkBackend.Service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo, EmailService emailService) {
        this.userRepo = userRepo;
    }

    @Override
    public UserResponseDto getCurrentUser() {
        User user = getUser();
        UserResponseDto userResponseDto = user.toDto(UserResponseDto.class);

        return userResponseDto;
    }

    @Override
    public int getCurrentUserId() {
        User user = getUser();
        return user.getId();
    }

    private User getUser() {
        return (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
