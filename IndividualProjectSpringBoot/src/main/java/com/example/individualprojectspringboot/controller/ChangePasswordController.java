package com.example.individualprojectspringboot.controller;
import com.example.individualprojectspringboot.pojo.ChangePasswordRequest;
import com.example.individualprojectspringboot.pojo.ChangePasswordResponse;

import com.example.individualprojectspringboot.service.ChangePasswordServicee;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ChangePasswordController {
    private final ChangePasswordServicee changePasswordService;

    @PostMapping("/change-password")
    public ChangePasswordResponse changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return changePasswordService.changePassword(changePasswordRequest);
    }
}
