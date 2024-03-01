package com.example.individualprojectspringboot.controller;
import com.example.individualprojectspringboot.entity.User;
import com.example.individualprojectspringboot.pojo.UserPojo;
import com.example.individualprojectspringboot.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RequestMapping("/user")
@RestController
@RequiredArgsConstructor

public class UserController {
    private final UserService userService;
    @PostMapping("/save")
    public String saveUser(@Valid @RequestBody UserPojo userPojo){
        userService.saveUser(userPojo);
        return "data created successfully";
    }
    @GetMapping("/getAll")
    public List<User> getAllData(){
        return userService.getAllData();
    }
    @GetMapping("/getById/{id}")
    public Optional<User> getDataBtId(@PathVariable("id") Integer id){
        return userService.getById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        userService.deleteById(id);
    }

}
