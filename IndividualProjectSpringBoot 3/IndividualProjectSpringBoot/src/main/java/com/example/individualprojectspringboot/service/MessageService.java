package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.pojo.MessagePojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface MessageService {

        void saveMessage(MessagePojo messagePojo) throws IOException;

        List<Message> findAll();

//        Optional<Blog> findById(Integer id);

        void deleteById(Integer id);

//        void updateBlog(Integer id, BlogPojo updatedBlogPojo) throws IOException;

    }




