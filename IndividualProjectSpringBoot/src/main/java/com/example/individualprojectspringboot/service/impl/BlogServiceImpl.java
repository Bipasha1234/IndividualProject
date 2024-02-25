package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Package;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.pojo.PackagePojo;
import com.example.individualprojectspringboot.repository.BlogRepository;
import com.example.individualprojectspringboot.repository.PackageRepository;
import com.example.individualprojectspringboot.service.BlogService;
import com.example.individualprojectspringboot.service.PackageService;
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
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/image/blogImage").toString();
    ImageToBase64 imageToBase64 = new ImageToBase64();

    @Override
    public void saveBlog(BlogPojo blogPojo) throws IOException {
        Blog blogEntity = new Blog();

        if (blogPojo.getId() != null) {
            blogEntity = blogRepository.findById(blogPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        }

        blogEntity.setBlogName(blogPojo.getBlogName());
        blogEntity.setBlogDescription(blogPojo.getBlogDescription());

        if (blogPojo.getBlogImage() != null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, blogPojo.getBlogImage().getOriginalFilename());
            fileNames.append(blogPojo.getBlogImage().getOriginalFilename());
            Files.write(fileNameAndPath, blogPojo.getBlogImage().getBytes());
        }


        blogEntity.setBlogImage(blogPojo.getBlogImage().getOriginalFilename());
        blogRepository.save(blogEntity);
    }

    @Override
    public List<Blog> findAll() {
        List<Blog> blogs = blogRepository.findAll();
//        return  blogRepository.findAll();
        blogs = blogs.stream().map(blogEntity -> {
            blogEntity.setBlogImage(imageToBase64.getImageBase64("/blogImage/" +blogEntity.getBlogImage()));
            return blogEntity;
        }).collect(Collectors.toList());
        return blogs;
    }

//    public List<Blog> findAll() {
//        List<Blog> blogs = blogRepository.findAll();
//        // Log or print packages to check if data is retrieved
//        System.out.println("Retrieved Blogs: " + blogs);
//        return blogs;
//    }


    @Override
    public Optional<Blog> findById(Integer id) {

        Optional<Blog> blogOptional = blogRepository.findById(id);

        return blogOptional.map(blogEntity -> {
            blogEntity.setBlogImage(imageToBase64.getImageBase64("/blogImage/" + blogEntity.getBlogImage()));
            return blogEntity;
        });
    }

    @Override
    public void deleteById(Integer id) {
        blogRepository.deleteById(id);
    }


        @Override
        public void updateBlog(Integer id, BlogPojo updatedBlogPojo) throws IOException {
            Optional<Blog> optionalBlog = blogRepository.findById(id);
            if (optionalBlog.isPresent()) {
                Blog existingBlog = optionalBlog.get();

                // Update existingPackage with fields from updatedPackagePojo
                existingBlog.setBlogName(updatedBlogPojo.getBlogName());
                existingBlog.setBlogDescription(updatedBlogPojo.getBlogDescription());

                if (updatedBlogPojo.getBlogImage() != null && !updatedBlogPojo.getBlogImage().isEmpty()) {
                    Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, updatedBlogPojo.getBlogImage().getOriginalFilename());
                    Files.write(fileNameAndPath, updatedBlogPojo.getBlogImage().getBytes());
                    existingBlog.setBlogImage(updatedBlogPojo.getBlogImage().getOriginalFilename());
                }

                blogRepository.save(existingBlog);
            } else {
                // Handle not found scenario
                throw new IllegalArgumentException("Blog with id " + id + " not found");
            }
        }
    }


