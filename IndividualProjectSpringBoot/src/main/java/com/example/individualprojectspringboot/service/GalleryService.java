package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Gallery;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.pojo.GalleryPojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface GalleryService {


        void saveGallery(GalleryPojo galleryPojo) throws IOException;

        List<Gallery> findAll();

        void deleteById(Integer id);

        void updateGallery(Integer id, GalleryPojo updatedGalleryPojo) throws IOException;

    }




