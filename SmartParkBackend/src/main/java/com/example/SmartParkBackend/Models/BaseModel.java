package com.example.SmartParkBackend.Models;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

import java.util.Date;

@Getter
@MappedSuperclass
public abstract class BaseModel {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  id;

    @Column(name = "DateCreated")
    private final Date dateCreated =  new Date();

    public abstract <T> T toDto(Class<T> type);
}
