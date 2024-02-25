package com.example.individualprojectspringboot.controller;

import com.example.individualprojectspringboot.entity.Booking;
import com.example.individualprojectspringboot.pojo.BookingPojo;
import com.example.individualprojectspringboot.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/booking")
@RestController
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/save")
    public String saveBooking(@RequestBody @Valid BookingPojo bookingPojo) {
        bookingService.saveBooking(bookingPojo);
        return "Data created successfully!";
    }

    @GetMapping("/getAll")
    public List<Booking> findAll() {
        return bookingService.findAll();
    }

            @GetMapping("/getById/{id}")
        public Optional<Booking> findById(@PathVariable("id") Integer id){
            return bookingService.findById(id);
        }


    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        bookingService.deleteById(id);
    }

}
