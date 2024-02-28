package com.example.individualprojectspringboot.controller;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.pojo.MessagePojo;
import com.example.individualprojectspringboot.service.BlogService;
import com.example.individualprojectspringboot.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/message")
@RestController
@RequiredArgsConstructor
public class MessageController {


        private final MessageService messageService;

        @PostMapping("/save")
        public String saveMessage(@RequestBody @Valid MessagePojo messagePojo) throws IOException {
            messageService.saveMessage(messagePojo);
            return "data created successfully yohhh";
        }

        @GetMapping("/getAll")
        public List<Message> findAll(){
            return messageService.findAll();
        }

//        @GetMapping("/getById/{id}")
//        public Optional<Blog> findById(@PathVariable("id") Integer id){
//            return messageService.findById(id);
//        }

        @DeleteMapping("/deleteById/{id}")
        public void deleteById(@PathVariable("id") Integer id){
            messageService.deleteById(id);
        }

//        @PutMapping("/update/{id}")
//        public String updateBlog(@PathVariable("id") Integer id, @RequestBody @ModelAttribute BlogPojo updatedBlogPojo) throws IOException {
//            blogService.updateBlog(id, updatedBlogPojo);
//            return "data updated successfully";
//        }
    }






