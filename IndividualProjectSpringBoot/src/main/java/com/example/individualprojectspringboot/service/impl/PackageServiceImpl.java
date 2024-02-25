package com.example.individualprojectspringboot.service.impl;

import com.example.individualprojectspringboot.entity.Package;
import com.example.individualprojectspringboot.pojo.PackagePojo;
import com.example.individualprojectspringboot.repository.PackageRepository;
import com.example.individualprojectspringboot.service.PackageService;
import com.example.individualprojectspringboot.util.ImageToBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;
    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/image/packageImage").toString();

    ImageToBase64 imageToBase64 = new ImageToBase64();

    @Override
    public void savePackage(PackagePojo packagePojo) throws IOException {
        Package packageEntity = new Package();

        if (packagePojo.getId() != null) {
            packageEntity = packageRepository.findById(packagePojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        }

        packageEntity.setPackageName(packagePojo.getPackageName());

        packageEntity.setPackageDescription(packagePojo.getPackageDescription());
        packageEntity.setPackageDifficulty(packagePojo.getPackageDifficulty());
        packageEntity.setPackagePerPrice(packagePojo.getPackagePerPrice());
        packageEntity.setPackageFaq(packagePojo.getPackageFaq());
        packageEntity.setPackageMaxAltitude(packagePojo.getPackageMaxAltitude());

        packageEntity.setPackageBestTime(packagePojo.getPackageBestTime());

        packageEntity.setPackageItinerary(packagePojo.getPackageItinerary());

        packageEntity.setPackageDuration(packagePojo.getPackageDuration());

        if (packagePojo.getPackageImage() != null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, packagePojo.getPackageImage().getOriginalFilename());
            fileNames.append(packagePojo.getPackageImage().getOriginalFilename());
            Files.write(fileNameAndPath, packagePojo.getPackageImage().getBytes());
        }


        packageEntity.setPackageImage(packagePojo.getPackageImage().getOriginalFilename());
        packageRepository.save(packageEntity);
    }

    @Override
    public List<Package> findAll() {
        List<Package> packages = packageRepository.findAll();
        packages = packages.stream().map(packageEntity -> {
            packageEntity.setPackageImage(imageToBase64.getImageBase64("/packageImage/" + packageEntity.getPackageImage()));
            return packageEntity;
        }).collect(Collectors.toList());
        return packages;
    }

    @Override
    public Optional<Package> findById(Integer id) {
        Optional<Package> packageOptional = packageRepository.findById(id);

        return packageOptional.map(packageEntity -> {
            packageEntity.setPackageImage(imageToBase64.getImageBase64("/packageImage/" + packageEntity.getPackageImage()));
            return packageEntity;
        });
    }


    @Override
    public void deleteById(Integer id) {
        packageRepository.deleteById(id);
    }

    @Override
    public void updatePackage(Integer id, PackagePojo updatedPackagePojo) throws IOException {
        Optional<Package> optionalPackage = packageRepository.findById(id);
        if (optionalPackage.isPresent()) {
            Package existingPackage = optionalPackage.get();

            existingPackage.setPackageName(updatedPackagePojo.getPackageName());
            existingPackage.setPackageDescription(updatedPackagePojo.getPackageDescription());
            existingPackage.setPackageDifficulty(updatedPackagePojo.getPackageDifficulty());
            existingPackage.setPackagePerPrice(updatedPackagePojo.getPackagePerPrice());
            existingPackage.setPackageMaxAltitude(updatedPackagePojo.getPackageMaxAltitude());
            existingPackage.setPackageBestTime(updatedPackagePojo.getPackageBestTime());

            existingPackage.setPackageFaq(updatedPackagePojo.getPackageFaq());
            existingPackage.setPackageItinerary(updatedPackagePojo.getPackageItinerary());
            existingPackage.setPackageDuration(updatedPackagePojo.getPackageDuration());

            if (updatedPackagePojo.getPackageImage() != null && !updatedPackagePojo.getPackageImage().isEmpty()) {
                Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, updatedPackagePojo.getPackageImage().getOriginalFilename());
                Files.write(fileNameAndPath, updatedPackagePojo.getPackageImage().getBytes());
                existingPackage.setPackageImage(updatedPackagePojo.getPackageImage().getOriginalFilename());
            }

            packageRepository.save(existingPackage);
        } else {
            throw new IllegalArgumentException("Package with id " + id + " not found");
        }
    }
}
