package com.example.individualprojectspringboot.pojo;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomizeTripPojo {

    private Integer id;
    @NotEmpty
    private String fullName;
    @NotEmpty
    private String phoneNumber;
    @NotEmpty
    private String emailAddress;
    @NotEmpty
    private String selectTrip;
    @NotEmpty
    private String approxDate;
    @NotEmpty
    private String tripLength;
    @NotEmpty
    private String numberOfAdults;
    @NotEmpty
    private String numberOfChildren;
    @NotEmpty
    private String tourType;
    @NotEmpty
    private String hotelType;
    @NotEmpty
    private String estimatedBudget;
    @NotEmpty
    private String guideLanguage;
    @NotEmpty
    private String moreInfo;
    @NotEmpty
    private String whereDidYouFindUs;
}
