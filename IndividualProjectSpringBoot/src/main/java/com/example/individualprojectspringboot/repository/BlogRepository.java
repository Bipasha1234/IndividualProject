package com.example.individualprojectspringboot.repository;

import com.example.individualprojectspringboot.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BlogRepository  extends JpaRepository<Blog, Integer>{



    }




