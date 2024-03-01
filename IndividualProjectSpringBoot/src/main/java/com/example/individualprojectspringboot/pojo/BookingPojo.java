package com.example.individualprojectspringboot.pojo;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookingPojo {
    private Integer id;
    private String bookingName;
    private String bookingPhoneNumber;

    private String bookingEmail;

    private String bookingTripDate;

    private String bookingTravellers;

    private String bookingExtra;

    private Integer packageId;

}
