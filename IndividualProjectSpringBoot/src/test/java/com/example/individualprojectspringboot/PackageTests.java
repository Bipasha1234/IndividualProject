package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.entity.Package;
import com.example.individualprojectspringboot.repository.PackageRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PackageTests {

    @Autowired
    private PackageRepository packageRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void savePackage() {
        Package pack = Package.builder()
                .packageName("Test Package")
                .packageDescription("Test description")
                .packageDifficulty("Easy")
                .packagePerPrice("100")
                .packageMaxAltitude("2000")
                .packageBestTime("Spring")
                .packageItinerary("Test itinerary")
                .packageFaq("Test FAQ")
                .packageDuration("3 days")
                .build();

        MockMultipartFile imageFile = new MockMultipartFile("packageImage", "test_image.jpg", "image/jpeg", "test image".getBytes());

        // Set the packageImage field
        pack.setPackageImage(String.valueOf(imageFile));

        // Save the package
        packageRepository.save(pack);

        // Assertions
        Assertions.assertThat(pack.getId()).isNotNull();
    }

    @Test
    @Order(2)
    public void getPackageTest() {
        Optional<Package> packOptional = packageRepository.findById(1);
        Assertions.assertThat(packOptional).isPresent();
        Package pack = packOptional.orElse(null);
        Assertions.assertThat(pack).isNotNull();
        Assertions.assertThat(pack.getId()).isEqualTo(1L);
    }

    @Test
    @Order(3)
    public void fetchAll() {
        List<Package> packages = packageRepository.findAll();
        Assertions.assertThat(packages.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updatePackage() {
        Optional<Package> packOptional = packageRepository.findById(1);
        Assertions.assertThat(packOptional).isPresent();
        Package pack = packOptional.orElse(null);
        Assertions.assertThat(pack).isNotNull();

        pack.setPackageName("Updated Package");
        Package updatedPack = packageRepository.save(pack);
        Assertions.assertThat(updatedPack.getPackageName()).isEqualTo("Updated Package");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deletePackage() {
        Optional<Package> packOptional = packageRepository.findById(1);
        Assertions.assertThat(packOptional).isPresent();
        Package pack = packOptional.orElse(null);
        Assertions.assertThat(pack).isNotNull();

        packageRepository.delete(pack);

        Optional<Package> deletedPackOptional = packageRepository.findById(1);
        Assertions.assertThat(deletedPackOptional).isEmpty();
    }
}
