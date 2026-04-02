package com.example.SmartParkBackend.Controller;

import com.example.SmartParkBackend.DTO.Response.UserResponseDto;
import com.example.SmartParkBackend.Models.User;
import com.example.SmartParkBackend.Service.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("get/current-user")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponseDto> getCurrentUser() {
        UserResponseDto user = userService.getCurrentUser();

        return ResponseEntity.ok(user);
    }
}
