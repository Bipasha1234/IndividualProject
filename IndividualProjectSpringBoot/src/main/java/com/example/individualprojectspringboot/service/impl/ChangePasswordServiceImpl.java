package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.pojo.ChangePasswordRequest;
import com.example.individualprojectspringboot.pojo.ChangePasswordResponse;
import com.example.individualprojectspringboot.entity.User;
import com.example.individualprojectspringboot.repository.UserRepository;

import com.example.individualprojectspringboot.service.ChangePasswordServicee;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChangePasswordServiceImpl implements ChangePasswordServicee {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ChangePasswordResponse changePassword(ChangePasswordRequest request) {
        String email = request.getEmail();
        String currentPassword = request.getCurrentPassword();
        String newPassword = request.getNewPassword();



        User user = userRepository.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return new ChangePasswordResponse("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return new ChangePasswordResponse("Password changed successfully");
    }
}
