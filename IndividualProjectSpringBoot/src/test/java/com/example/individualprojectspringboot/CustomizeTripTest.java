package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.entity.CustomizeTrip;
import com.example.individualprojectspringboot.repository.CustomizeTripRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CustomizeTripTest {

    @Autowired
    private CustomizeTripRepository customizeTripRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveCustomizeTrip() {
        CustomizeTrip customizeTrip = CustomizeTrip.builder()
                .fullName("John Doe")
                .phoneNumber("1234567890")
                .emailAddress("john@example.com")
                .selectTrip("Trip to Mountains")
                .approxDate("2024-03-01")
                .tripLength("5 days")
                .numberOfAdults("2")
                .numberOfChildren("1")
                .tourType("Adventure")
                .hotelType("Luxury")
                .estimatedBudget("High")
                .guideLanguage("English")
                .moreInfo("Additional info")
                .whereDidYouFindUs("Google")
                .build();

        customizeTripRepository.save(customizeTrip);
        assertNotNull(customizeTrip.getId());
    }

    @Test
    @Order(2)
    public void testFindAll() {
        List<CustomizeTrip> customizeTrips = customizeTripRepository.findAll();
        assertFalse(customizeTrips.isEmpty());
    }

    @Test
    @Order(3)
    @Rollback(value = false)
    public void testDeleteById() {
        Optional<CustomizeTrip> customizeTripOptional = customizeTripRepository.findById(1);
        assertTrue(customizeTripOptional.isPresent());

        CustomizeTrip customizeTrip = customizeTripOptional.get();
        customizeTripRepository.delete(customizeTrip);

        Optional<CustomizeTrip> deletedCustomizeTripOptional = customizeTripRepository.findById(1);
        assertFalse(deletedCustomizeTripOptional.isPresent());
    }
}
