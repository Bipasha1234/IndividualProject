package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.entity.User;
import com.example.individualprojectspringboot.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveUser() {
        User user = User.builder()
                .fullName("bIPASHA")
                .userName("bipasha")
                .password("123456")
                .build();

        userRepository.save(user);
        Assertions.assertThat(user.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    @Rollback(value = false)
    public void getUserTest() {
        Optional<User> userOptional = userRepository.findById(1);
        Assertions.assertThat(userOptional).isPresent();
        User user = userOptional.orElse(null);
        Assertions.assertThat(user).isNotNull();
        Assertions.assertThat(user.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void fetchAll() {
        List<User> users = userRepository.findAll();
        Assertions.assertThat(users.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void Update() {
        Optional<User> userOptional = userRepository.findById(1);
        Assertions.assertThat(userOptional).isPresent();
        User user = userOptional.orElse(null);
        Assertions.assertThat(user).isNotNull();

        user.setFullName("bIPASHA");
        User updatedUser = userRepository.save(user);
        Assertions.assertThat(updatedUser.getFullName()).isEqualTo("bIPASHA");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void Delete() {
        Optional<User> userOptional = userRepository.findById(1);
        Assertions.assertThat(userOptional).isPresent();
        User user = userOptional.orElse(null);
        Assertions.assertThat(user).isNotNull();

        userRepository.delete(user);

        Optional<User> deletedUserOptional = userRepository.findById(1);
        Assertions.assertThat(deletedUserOptional).isEmpty();
    }
}
