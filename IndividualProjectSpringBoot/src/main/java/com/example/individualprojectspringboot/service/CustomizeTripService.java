package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.entity.CustomizeTrip;
import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.pojo.CustomizeTripPojo;
import com.example.individualprojectspringboot.pojo.MessagePojo;

import java.io.IOException;
import java.util.List;

public interface CustomizeTripService {

        void saveTrip(CustomizeTripPojo customizeTripPojo) throws IOException;

        List<CustomizeTrip> findAll();
        void deleteById(Integer id);

    }

