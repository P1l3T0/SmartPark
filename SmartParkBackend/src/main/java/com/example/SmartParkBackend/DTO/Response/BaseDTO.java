package com.example.SmartParkBackend.DTO.Response;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseDTO {
    private int  id;
    private Date dateCreated;
}
