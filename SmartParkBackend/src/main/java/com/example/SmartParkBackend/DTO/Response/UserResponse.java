package com.example.SmartParkBackend.DTO.Response;
import lombok.Data;
import java.util.Date;

@Data
public class UserResponse extends BaseDTO {
    private String username;
    private String email;

    public UserResponse(int id, Date dateCreated, String username, String email) {
        super(id, dateCreated);
        this.username = username;
        this.email = email;
    }
}
