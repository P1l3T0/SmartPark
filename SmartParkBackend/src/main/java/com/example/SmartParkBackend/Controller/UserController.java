package com.example.SmartParkBackend.Controller;

import com.example.SmartParkBackend.DTO.Response.UserResponseDto;
import com.example.SmartParkBackend.Service.User.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
