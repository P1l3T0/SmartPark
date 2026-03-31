package com.example.SmartParkBackend.Repo;

import com.example.SmartParkBackend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepo extends JpaRepository<User, Integer> {
}
