package com.example.SmartParkBackend.Controller;

import com.example.SmartParkBackend.DTO.Request.UserRequest;
import com.example.SmartParkBackend.DTO.Response.UserResponse;
import com.example.SmartParkBackend.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/user/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("get/current-user")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> getCurrentUser() {
        UserResponse currentUser = userService.getCurrentUser().join();
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }
}
