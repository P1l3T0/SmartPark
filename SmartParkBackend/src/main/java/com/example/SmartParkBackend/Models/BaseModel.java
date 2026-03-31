package com.example.SmartParkBackend.Models;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.util.Date;

@MappedSuperclass
public abstract class BaseModel {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  id;

    @Column(name = "DateCreated")
    private final Date dateCreated =  new Date();

    public int  getId() { 
        return this.id;
    }

    public Date getDateCreated() { 
        return this.dateCreated;
    }

    public abstract <T> T toDto(Class<T> type);
}
