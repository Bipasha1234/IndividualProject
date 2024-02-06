package com.example.individualprojectspringboot.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter

public class MessagePojo {
        private Integer id;
        @NotEmpty
        private String messageName;
        @NotEmpty
        private String messageEmail;
        @NotEmpty
        private String messageNumber;
        @NotEmpty
    private String messageMsg;



}
