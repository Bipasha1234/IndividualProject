package com.example.individualprojectspringboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="booking")
public class Booking {
        @Id
        @SequenceGenerator(name = "booking_seq_gen", sequenceName = "booking_id_seq", allocationSize = 1)
        @GeneratedValue(generator = "booking_seq_gen", strategy = GenerationType.SEQUENCE)
        private Integer id;


    @ManyToOne
    @JoinColumn(name = "package_id")
    private Package pkg;


    @Column(name = "booking_name", nullable = false,length = 255)
        private String bookingName;


    @Column(name = "booking_phone_number", nullable = false, length = 255)
    private String bookingPhoneNumber;

        @Column(name = "booking_email", nullable = false, length = 255)
        private String bookingEmail;
    @Column(name = "booking_tripDate", nullable = false, length = 255)
    private String bookingTripDate;
    @Column(name = "booking_travellers", nullable = false, length = 255)
    private String bookingTravellers;
    @Column(name = "booking_extra", nullable = false, length = 255)
    private String bookingExtra;


    }




