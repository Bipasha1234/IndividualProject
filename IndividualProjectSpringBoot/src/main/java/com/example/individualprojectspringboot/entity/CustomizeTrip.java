package com.example.individualprojectspringboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name="customize_trip")


public class CustomizeTrip {

    @Id
        @SequenceGenerator(name = "customize_trip_seq_gen", sequenceName = "customize_trip_id_seq", allocationSize = 1)
        @GeneratedValue(generator = "customize_trip_seq_gen", strategy = GenerationType.SEQUENCE)
        private Integer id;

    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name = "email_address", nullable = false, length = 255)
    private String emailAddress;

    @Column(name = "select_trip", nullable = false, length = 255)
    private String selectTrip;

    @Column(name = "approx_date", nullable = false, length = 20)
    private String approxDate;

    @Column(name = "trip_length", nullable = false, length = 20)
    private String tripLength;

    @Column(name = "number_of_adults", nullable = false, length = 10)
    private String numberOfAdults;

    @Column(name = "number_of_children", nullable = false, length = 10)
    private String numberOfChildren;

    @Column(name = "tour_type", nullable = false, length = 255)
    private String tourType;

    @Column(name = "hotel_type", nullable = false, length = 255)
    private String hotelType;

    @Column(name = "estimated_budget", nullable = false, length = 255)
    private String estimatedBudget;

    @Column(name = "guide_language", nullable = false, length = 255)
    private String guideLanguage;

    @Column(name = "more_info", length = 1000)
    private String moreInfo;

    @Column(name = "where_did_you_find_us", nullable = false, length = 255)
    private String whereDidYouFindUs;


}
