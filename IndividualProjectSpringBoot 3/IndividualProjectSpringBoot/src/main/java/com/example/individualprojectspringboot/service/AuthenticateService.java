package com.example.individualprojectspringboot.service;


import com.example.individualprojectspringboot.pojo.AuthenticateRequest;
import com.example.individualprojectspringboot.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}
