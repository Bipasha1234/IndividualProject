package com.example.individualprojectspringboot.repository;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Integer> {
}
