package com.example.SmartParkBackend.Repo;

import com.example.SmartParkBackend.Models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Integer> {
    Optional<User> findById(int id);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}