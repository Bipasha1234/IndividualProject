package com.example.individualprojectspringboot.pojo;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter

public class PackagePojo {

        private Integer id;
        @NotEmpty
        private String packageName;
@NotNull
        private MultipartFile packageImage;
        @NotEmpty

        private String packageDescription;
        @NotEmpty
        private String packageDifficulty;
        @NotEmpty
        private String packagePerPrice;
    @NotEmpty
    private String packageMaxAltitude;
    @NotEmpty
    private String packageBestTime;


    @NotEmpty
    private String packageItinerary;
    @NotEmpty
    private String packageFaq;

    @NotEmpty
    private String packageDuration;
    }


