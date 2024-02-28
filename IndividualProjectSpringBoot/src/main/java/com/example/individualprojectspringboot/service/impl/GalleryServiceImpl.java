package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Gallery;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.pojo.GalleryPojo;
import com.example.individualprojectspringboot.repository.BlogRepository;
import com.example.individualprojectspringboot.repository.GalleryRepository;
import com.example.individualprojectspringboot.service.BlogService;
import com.example.individualprojectspringboot.service.GalleryService;
import com.example.individualprojectspringboot.util.ImageToBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {

        private final GalleryRepository galleryRepository;
        private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/image/blogImage").toString();
        ImageToBase64 imageToBase64 = new ImageToBase64();

        @Override
        public void saveGallery(GalleryPojo galleryPojo) throws IOException {
            Gallery galleryEntity = new Gallery();

            if (galleryPojo.getId() != null) {
                galleryEntity = galleryRepository.findById(galleryPojo.getId())
                        .orElseThrow(() -> new NoSuchElementException("No data found"));
            }



            if (galleryPojo.getGalleryImage() != null) {
                StringBuilder fileNames = new StringBuilder();
                Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, galleryPojo.getGalleryImage().getOriginalFilename());
                fileNames.append(galleryPojo.getGalleryImage().getOriginalFilename());
                Files.write(fileNameAndPath, galleryPojo.getGalleryImage().getBytes());
            }


            galleryEntity.setGalleryImage(galleryPojo.getGalleryImage().getOriginalFilename());
            galleryRepository.save(galleryEntity);
        }

        @Override
        public List<Gallery> findAll() {
            List<Gallery> gallerys = galleryRepository.findAll();
//        return  blogRepository.findAll();
            gallerys = gallerys.stream().map(galleryEntity -> {
                galleryEntity.setGalleryImage(imageToBase64.getImageBase64("/blogImage/" +galleryEntity.getGalleryImage()));
                return galleryEntity;
            }).collect(Collectors.toList());
            return gallerys;
        }

//    public List<Blog> findAll() {
//        List<Blog> blogs = blogRepository.findAll();
//        // Log or print packages to check if data is retrieved
//        System.out.println("Retrieved Blogs: " + blogs);
//        return blogs;
//    }


//        @Override
//        public Optional<Blog> findById(Integer id) {
//
//            Optional<Blog> blogOptional = blogRepository.findById(id);
//
//            return blogOptional.map(blogEntity -> {
//                blogEntity.setBlogImage(imageToBase64.getImageBase64("/blogImage/" + blogEntity.getBlogImage()));
//                return blogEntity;
//            });
//        }

        @Override
        public void deleteById(Integer id) {

            galleryRepository.deleteById(id);
        }


        @Override
        public void updateGallery(Integer id, GalleryPojo updatedGalleryPojo) throws IOException {
            Optional<Gallery> optionalGallery = galleryRepository.findById(id);
            if (optionalGallery.isPresent()) {
                Gallery existingGallery = optionalGallery.get();


                if (updatedGalleryPojo.getGalleryImage() != null && !updatedGalleryPojo.getGalleryImage().isEmpty()) {
                    Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, updatedGalleryPojo.getGalleryImage().getOriginalFilename());
                    Files.write(fileNameAndPath, updatedGalleryPojo.getGalleryImage().getBytes());
                    existingGallery.setGalleryImage(updatedGalleryPojo.getGalleryImage().getOriginalFilename());
                }

                galleryRepository.save(existingGallery);
            } else {
                // Handle not found scenario
                throw new IllegalArgumentException("Gallery with id " + id + " not found");
            }
        }
    }




