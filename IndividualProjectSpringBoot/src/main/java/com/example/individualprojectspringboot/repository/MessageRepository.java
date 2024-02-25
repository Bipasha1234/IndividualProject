package com.example.individualprojectspringboot.repository;

import com.example.individualprojectspringboot.entity.Blog;
import com.example.individualprojectspringboot.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface MessageRepository extends JpaRepository<Message, Integer> {




}
