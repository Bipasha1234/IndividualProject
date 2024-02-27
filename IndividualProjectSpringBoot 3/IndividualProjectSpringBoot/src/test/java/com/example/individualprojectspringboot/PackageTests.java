package com.example.individualprojectspringboot;

import com.example.individualprojectspringboot.controller.PackageController;
import com.example.individualprojectspringboot.entity.Package;
import com.example.individualprojectspringboot.pojo.PackagePojo;
import com.example.individualprojectspringboot.service.PackageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PackageTests {

    @Mock
    private PackageService packageService;

    @InjectMocks
    private PackageController packageController;

    @Test
    public void testSavePackage() throws IOException {
        PackagePojo packagePojo = new PackagePojo();
        packagePojo.setPackageName("Test Package");
        packagePojo.setPackageDescription("Test description");
        packagePojo.setPackageDifficulty("Easy");
        packagePojo.setPackagePerPrice("100");
        packagePojo.setPackageMaxAltitude("2000");
        packagePojo.setPackageBestTime("Spring");
        packagePojo.setPackageItinerary("Test itinerary");
        packagePojo.setPackageFaq("Test FAQ");
        packagePojo.setPackageDuration("3 days");
        MockMultipartFile imageFile = new MockMultipartFile("packageImage", "test_image.jpg", "image/jpeg", "test image".getBytes());
        packagePojo.setPackageImage(imageFile);


        String result = packageController.savePackage(packagePojo);

        assertEquals("data created successfully yoh", result);
        verify(packageService, times(1)).savePackage(packagePojo);
    }

    @Test
    public void testFindAll() {
        Package package1 = new Package();
        Package package2 = new Package();
        when(packageService.findAll()).thenReturn(Arrays.asList(package1, package2));

        List<Package> result = packageController.findAll();

        assertEquals(2, result.size());
        verify(packageService, times(1)).findAll();
    }

    @Test
    public void testFindById() {
        Package package1 = new Package();
        when(packageService.findById(1)).thenReturn(Optional.of(package1));

        Optional<Package> result = packageController.findById(1);

        assertEquals(Optional.of(package1), result);
        verify(packageService, times(1)).findById(1);
    }

    @Test
    public void testDeleteById() {
        packageController.deleteById(1);

        verify(packageService, times(1)).deleteById(1);
    }

    @Test
    public void testUpdatePackage() throws IOException {
        PackagePojo updatedPackagePojo = new PackagePojo();
        updatedPackagePojo.setPackageName("Updated Package");
        updatedPackagePojo.setPackageDescription("Updated description");
        updatedPackagePojo.setPackageDifficulty("Moderate");
        updatedPackagePojo.setPackagePerPrice("150");
        updatedPackagePojo.setPackageMaxAltitude("2500");
        updatedPackagePojo.setPackageBestTime("Summer");
        updatedPackagePojo.setPackageItinerary("Updated itinerary");
        updatedPackagePojo.setPackageFaq("Updated FAQ");
        updatedPackagePojo.setPackageDuration("5 days");
        MockMultipartFile imageFile = new MockMultipartFile("packageImage", "test_image.jpg", "image/jpeg", "test image".getBytes());
        updatedPackagePojo.setPackageImage(imageFile);

        String result = packageController.updatePackage(1, updatedPackagePojo);

        assertEquals("data updated successfully", result);
        verify(packageService, times(1)).updatePackage(1, updatedPackagePojo);
    }
}
