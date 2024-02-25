package com.example.individualprojectspringboot.repository;

import com.example.individualprojectspringboot.entity.CustomizeTrip;
import com.example.individualprojectspringboot.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomizeTripRepository  extends JpaRepository<CustomizeTrip, Integer> {
}
