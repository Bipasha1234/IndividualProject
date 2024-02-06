package com.example.individualprojectspringboot.controller;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Package;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.pojo.PackagePojo;
import com.example.individualprojectspringboot.service.BlogService;
import com.example.individualprojectspringboot.service.PackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@RequestMapping("/blog")
@RestController
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

        @PostMapping("/save")
        public String saveBlog(@RequestBody @ModelAttribute BlogPojo blogPojo) throws IOException {
            blogService.saveBlog(blogPojo);
            return "data created successfully yohhh";
        }

        @GetMapping("/getAll")
        public List<Blog> findAll(){
            return blogService.findAll();
        }

        @GetMapping("/getById/{id}")
        public Optional<Blog> findById(@PathVariable("id") Integer id){
            return blogService.findById(id);
        }

        @DeleteMapping("/deleteById/{id}")

        public void deleteById(@PathVariable("id") Integer id){
            blogService.deleteById(id);
        }

        @PutMapping("/update/{id}")
        public String updateBlog(@PathVariable("id") Integer id, @RequestBody @ModelAttribute BlogPojo updatedBlogPojo) throws IOException {
            blogService.updateBlog(id, updatedBlogPojo);
            return "data updated successfully";
        }
    }




