package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.entity.User;
import com.example.individualprojectspringboot.pojo.AuthenticateRequest;
import com.example.individualprojectspringboot.pojo.AuthenticateResponse;
import com.example.individualprojectspringboot.repository.UserRepository;
import com.example.individualprojectspringboot.security.JwtService;
import com.example.individualprojectspringboot.service.AuthenticateService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticateServiceImpl implements AuthenticateService {

    private final UserRepository userRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticateRequest.getUserName(), authenticateRequest.getPassword()
                )
        );
        User user= userRepo.getUserByUserName(authenticateRequest.getUserName())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        UserDetails userDetails = (UserDetails) user;
        String jwtToken = jwtService.generateToken(userDetails);
        return AuthenticateResponse.builder().token(jwtToken).isAdmin(user.getId()==3).build();
    }
}
