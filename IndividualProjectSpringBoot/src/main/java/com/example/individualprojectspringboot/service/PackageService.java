package com.example.individualprojectspringboot.service;

import com.example.individualprojectspringboot.pojo.PackagePojo;
import com.example.individualprojectspringboot.entity.Package;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface PackageService {

    void savePackage(PackagePojo packagePojo) throws IOException;

    List<Package> findAll();

    Optional<Package> findById(Integer id);

    void deleteById(Integer id);

    void updatePackage(Integer id, PackagePojo updatedPackagePojo) throws IOException;

}
