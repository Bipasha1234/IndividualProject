package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.pojo.ChangePasswordRequest;
import com.example.individualprojectspringboot.pojo.ChangePasswordResponse;

public interface ChangePasswordServicee {
    ChangePasswordResponse changePassword(ChangePasswordRequest request);
}
