package com.example.individualprojectspringboot.repository;

import com.example.individualprojectspringboot.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Query("SELECT b FROM Booking b JOIN FETCH b.pkg")
    List<Booking> findAll();
}
