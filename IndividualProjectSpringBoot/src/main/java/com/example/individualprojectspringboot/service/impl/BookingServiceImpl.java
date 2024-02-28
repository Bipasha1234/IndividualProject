package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.entity.Booking;
import com.example.individualprojectspringboot.entity.Message;
import com.example.individualprojectspringboot.entity.Package;
import com.example.individualprojectspringboot.pojo.BookingPojo;
import com.example.individualprojectspringboot.repository.BookingRepository;
import com.example.individualprojectspringboot.repository.PackageRepository;
import com.example.individualprojectspringboot.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final PackageRepository packageRepository;
    private final JavaMailSender javaMailSender;

    @Override
    public void saveBooking(BookingPojo bookingPojo) {
        Booking bookingEntity = new Booking();
        Package pkg = packageRepository.findById(bookingPojo.getPackageId())
                .orElseThrow(() -> new NoSuchElementException("Package not found"));

        bookingEntity.setPkg(pkg);
        if (bookingPojo.getId() != null) {
            bookingEntity = bookingRepository.findById(bookingPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        }

        bookingEntity.setBookingName(bookingPojo.getBookingName());
        bookingEntity.setBookingPhoneNumber(bookingPojo.getBookingPhoneNumber());
        bookingEntity.setBookingEmail(bookingPojo.getBookingEmail());
        bookingEntity.setBookingTripDate(bookingPojo.getBookingTripDate());
        bookingEntity.setBookingTravellers(bookingPojo.getBookingTravellers());
        bookingEntity.setBookingExtra(bookingPojo.getBookingExtra());
        bookingRepository.save(bookingEntity);

        sendEmail(bookingEntity);
        // Add any additional logic related to saving booking information
    }

    @Override
    public List<Booking> findAll() {
        List<Booking> bookings = bookingRepository.findAll();
        System.out.println("Retrieved Bookings: " + bookings);
        return bookings;
    }
    @Override
    public Optional<Booking> findById(Integer id) {
        return bookingRepository.findById(id);


    }



    @Override
    public void deleteById(Integer id) {
        bookingRepository.deleteById(id);
    }

    private void sendEmail(Booking booking) {
        // Send email to the customer
        SimpleMailMessage customerMailMessage = new SimpleMailMessage();
        customerMailMessage.setTo(booking.getBookingEmail());
        customerMailMessage.setSubject("Booking Confirmation");

        int travelers = Integer.parseInt(booking.getBookingTravellers());
        double perPrice = Double.parseDouble(booking.getPkg().getPackagePerPrice());

        customerMailMessage.setText(
                "Dear " + booking.getBookingName() + ",\n" +
                        "Thank you for booking with us!\n" +
                        "Booking Details:\n" +
                        "Package Name: " + booking.getPkg().getPackageName() + "\n" +
                        "Trip Date: " + booking.getBookingTripDate() + "\n" +
                        "Number of Travelers: " + travelers + "\n" +
                        "Total Cost: $" + (travelers * perPrice) + "\n" +
                        "We look forward to serving you. Have a great trip!"
        );

        javaMailSender.send(customerMailMessage);

        // Send email to the admin
        SimpleMailMessage adminMailMessage = new SimpleMailMessage();
        adminMailMessage.setTo("bipashalamsal@gmail.com"); // Replace with your admin's email address
        adminMailMessage.setSubject("New Booking Received");

        adminMailMessage.setText(
                "A new booking has been received:\n" +
                        "Booking ID: " + booking.getId() + "\n" +
                        "Customer Name: " + booking.getBookingName() + "\n" +
                        "Package Name: " + booking.getPkg().getPackageName() + "\n" +
                        "Trip Date: " + booking.getBookingTripDate() + "\n" +
                        "Number of Travelers: " + travelers
        );

        javaMailSender.send(adminMailMessage);
    }

}
