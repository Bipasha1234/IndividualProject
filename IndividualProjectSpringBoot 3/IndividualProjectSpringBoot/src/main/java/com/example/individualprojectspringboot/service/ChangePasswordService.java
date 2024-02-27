//package com.example.individualprojectspringboot.service;
//
//import com.example.individualprojectspringboot.Request.ChangePasswordRequest;
//import com.example.individualprojectspringboot.Request.ChangePasswordResponse;
//import com.example.individualprojectspringboot.entity.User;
//import com.example.individualprojectspringboot.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class ChangePasswordService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public ChangePasswordResponse changePassword(ChangePasswordRequest request) {
//        String email = request.getEmail();
//        String currentPassword = request.getCurrentPassword();
//        String newPassword = request.getNewPassword();
//
//        // Retrieve user from the database
//        User user = userRepository.getUserByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Verify current password
//        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
//            return new ChangePasswordResponse("Current password is incorrect");
//        }
//
//        // Update password
//        user.setPassword(passwordEncoder.encode(newPassword));
//        userRepository.save(user);
//
//        return new ChangePasswordResponse("Password changed successfully");
//    }
//}
