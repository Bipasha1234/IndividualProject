package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.Request.ChangePasswordRequest;
import com.example.individualprojectspringboot.Request.ChangePasswordResponse;

public interface ChangePasswordServicee {
    ChangePasswordResponse changePassword(ChangePasswordRequest request);
}
