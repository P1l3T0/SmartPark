package com.example.SmartParkBackend.Service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendVerificationEmail(String email, String subject, String text) throws MessagingException;
}
