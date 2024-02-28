package com.example.individualprojectspringboot.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter

public class GalleryPojo {
        private Integer id;

        @NotNull
        private MultipartFile galleryImage;









    }


