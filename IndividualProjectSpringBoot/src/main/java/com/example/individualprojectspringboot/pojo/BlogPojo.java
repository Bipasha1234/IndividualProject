package com.example.individualprojectspringboot.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class BlogPojo {

        private Integer id;
        @NotEmpty
        private String blogName;
        @NotNull
        private MultipartFile blogImage;
        @NotEmpty
        private String blogDescription;


}
