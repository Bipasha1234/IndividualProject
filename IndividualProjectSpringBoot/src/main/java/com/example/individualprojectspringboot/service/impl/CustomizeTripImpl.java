package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.entity.CustomizeTrip;
import com.example.individualprojectspringboot.pojo.CustomizeTripPojo;
import com.example.individualprojectspringboot.repository.CustomizeTripRepository;
import com.example.individualprojectspringboot.service.CustomizeTripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.NoSuchElementException;

@Service
public class CustomizeTripImpl implements CustomizeTripService {

    private final CustomizeTripRepository customizeTripRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public CustomizeTripImpl(CustomizeTripRepository customizeTripRepository, JavaMailSender javaMailSender) {
        this.customizeTripRepository = customizeTripRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void saveTrip(CustomizeTripPojo customizeTripPojo) throws IOException {
        CustomizeTrip tripEntity = new CustomizeTrip();

        // If you want to update an existing trip, uncomment the following lines
//        if (customizeTripPojo.getId() != null) {
//            tripEntity = customizeTripRepository.findById(customizeTripPojo.getId())
//                    .orElseThrow(() -> new NoSuchElementException("No data found"));
//        }

        tripEntity.setNumberOfChildren(customizeTripPojo.getNumberOfChildren());
        tripEntity.setSelectTrip(customizeTripPojo.getSelectTrip());
        tripEntity.setTripLength(customizeTripPojo.getTripLength());
        tripEntity.setTourType(customizeTripPojo.getTourType());
        tripEntity.setFullName(customizeTripPojo.getFullName());
        tripEntity.setEmailAddress(customizeTripPojo.getEmailAddress());
        tripEntity.setApproxDate(customizeTripPojo.getApproxDate());
        tripEntity.setEstimatedBudget(customizeTripPojo.getEstimatedBudget());
        tripEntity.setGuideLanguage(customizeTripPojo.getGuideLanguage());
        tripEntity.setHotelType(customizeTripPojo.getHotelType());
        tripEntity.setMoreInfo(customizeTripPojo.getMoreInfo());
        tripEntity.setNumberOfAdults(customizeTripPojo.getNumberOfAdults());
        tripEntity.setPhoneNumber(customizeTripPojo.getPhoneNumber());
        tripEntity.setWhereDidYouFindUs(customizeTripPojo.getWhereDidYouFindUs());


        customizeTripRepository.save(tripEntity);

        // Send email
        sendEmail(tripEntity);
    }

    private void sendEmail(CustomizeTrip customizeTrip) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("bipashalamsal@gmail.com"); // Replace with your admin's email address
        mailMessage.setSubject("New Message from Customize Trip Form");
        mailMessage.setText(
                "Name: " + customizeTrip.getFullName() + "\n" +
                        "Email: " + customizeTrip.getEmailAddress() + "\n" +
                        "Approx Date: " + customizeTrip.getApproxDate() + "\n" +
                        "Trip Type: " + customizeTrip.getSelectTrip() + "\n" +
                        "Number of Adults: " + customizeTrip.getNumberOfAdults() + "\n" +
                        "Number of Children: " + customizeTrip.getNumberOfChildren() + "\n" +
                        "Tour Type: " + customizeTrip.getTourType() + "\n" +
                        "Hotel Type: " + customizeTrip.getHotelType() + "\n" +
                        "Estimated Budget: " + customizeTrip.getEstimatedBudget() + "\n" +
                        "Guide Language: " + customizeTrip.getGuideLanguage() + "\n" +
                        "More Info: " + customizeTrip.getMoreInfo() + "\n" +
                        "Where Did You Find Us: " + customizeTrip.getWhereDidYouFindUs()+"\n"+
                        "Trip Length: "+customizeTrip.getTripLength()+"\n"+
                        "Phone Number: "+customizeTrip.getPhoneNumber()
        );

        javaMailSender.send(mailMessage);
    }
}
