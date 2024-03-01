package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.entity.Booking;
import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.pojo.BookingPojo;
import com.example.individualprojectspringboot.pojo.MessagePojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface BookingService {
        void saveBooking(BookingPojo bookingPojo);

        List<Booking> findAll();

        Optional<Booking> findById(Integer id);

        void deleteById(Integer id);


}
