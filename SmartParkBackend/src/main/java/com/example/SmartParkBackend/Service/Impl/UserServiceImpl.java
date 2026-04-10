package com.example.SmartParkBackend.Service.Impl;
import com.example.SmartParkBackend.DTO.Response.UserResponseDto;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public UserResponseDto getCurrentUser() {
        User user = getUser();

        return user.toDto(UserResponseDto.class);
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
