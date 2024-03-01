package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.controller.BlogController;
import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.pojo.BlogPojo;
import com.example.individualprojectspringboot.service.BlogService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BlogTests {

    @Mock
    private BlogService blogService;

    @InjectMocks
    private BlogController blogController;

    @Test
    public void testSaveBlog() throws IOException {
        BlogPojo blogPojo = new BlogPojo();
        blogPojo.setBlogName("Test Blog");
        blogPojo.setBlogDescription("Test description");
        MockMultipartFile imageFile = new MockMultipartFile("blogImage", "test_image.jpg", "image/jpeg", "test image".getBytes());
        blogPojo.setBlogImage(imageFile);

        String result = blogController.saveBlog(blogPojo);

        assertEquals("data created successfully yohhh", result);
        verify(blogService, times(1)).saveBlog(blogPojo);
    }

    @Test
    public void testFindAll() {
        Blog blog1 = new Blog();
        Blog blog2 = new Blog();
        when(blogService.findAll()).thenReturn(Arrays.asList(blog1, blog2));

        List<Blog> result = blogController.findAll();

        assertEquals(2, result.size());
        verify(blogService, times(1)).findAll();
    }

    @Test
    public void testFindById() {
        Blog blog1 = new Blog();
        when(blogService.findById(1)).thenReturn(Optional.of(blog1));

        Optional<Blog> result = blogController.findById(1);

        assertEquals(Optional.of(blog1), result);
        verify(blogService, times(1)).findById(1);
    }

    @Test
    public void testDeleteById() {
        blogController.deleteById(1);

        verify(blogService, times(1)).deleteById(1);
    }

    @Test
    public void testUpdateBlog() throws IOException {
        BlogPojo updatedBlogPojo = new BlogPojo();
        updatedBlogPojo.setBlogName("Updated Blog");
        updatedBlogPojo.setBlogDescription("Updated description");
        MockMultipartFile imageFile = new MockMultipartFile("blogImage", "test_image.jpg", "image/jpeg", "test image".getBytes());
        updatedBlogPojo.setBlogImage(imageFile);

        String result = blogController.updateBlog(1, updatedBlogPojo);

        assertEquals("data updated successfully", result);
        verify(blogService, times(1)).updateBlog(1, updatedBlogPojo);
    }
}
