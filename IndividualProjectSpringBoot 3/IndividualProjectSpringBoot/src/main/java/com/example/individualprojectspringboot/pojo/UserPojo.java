package com.example.individualprojectspringboot.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {

    private Integer id;

    @NotNull(message = "Full name is required")
    private String fullName;

    @NotNull
    private String userName;

    @NotNull
    private String password;
}
