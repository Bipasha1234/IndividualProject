package com.example.individualprojectspringboot.controller;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Gallery;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.pojo.GalleryPojo;
import com.example.individualprojectspringboot.service.BlogService;
import com.example.individualprojectspringboot.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/gallery")
@RestController
@RequiredArgsConstructor
public class GalleryController {
        private final GalleryService galleryService;

        @PostMapping("/save")
        public String saveGallery(@RequestBody @ModelAttribute GalleryPojo galleryPojo) throws IOException {
            galleryService.saveGallery(galleryPojo);
            return "data created successfully yohhh";
        }

        @GetMapping("/getAll")
        public List<Gallery> findAll(){

            return galleryService.findAll();
        }

//        @GetMapping("/getById/{id}")
//        public Optional<Blog> findById(@PathVariable("id") Integer id){
//            return blogService.findById(id);
//        }

        @DeleteMapping("/deleteById/{id}")

        public void deleteById(@PathVariable("id") Integer id){
            galleryService.deleteById(id);
        }

        @PutMapping("/update/{id}")
        public String updateGallery(@PathVariable("id") Integer id, @RequestBody @ModelAttribute GalleryPojo updatedGalleryPojo) throws IOException {
            galleryService.updateGallery(id, updatedGalleryPojo);
            return "data updated successfully";
        }
    }






