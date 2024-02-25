package com.example.individualprojectspringboot.service;


import com.example.individualprojectspringboot.entity.User;
import com.example.individualprojectspringboot.pojo.UserPojo;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void saveUser(UserPojo userPojo);

    List<User> getAllData();

    Optional<User> getById(Integer id);

    void deleteById(Integer id);
}
