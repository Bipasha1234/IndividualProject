package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.entity.Blog;

import com.example.individualprojectspringboot.pojo.BlogPojo;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface BlogService {


        void saveBlog(BlogPojo blogPojo) throws IOException;

        List<Blog> findAll();

        Optional<Blog> findById(Integer id);

        void deleteById(Integer id);

        void updateBlog(Integer id, BlogPojo updatedBlogPojo) throws IOException;

    }


