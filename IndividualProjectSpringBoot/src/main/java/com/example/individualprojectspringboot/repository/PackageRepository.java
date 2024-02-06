package com.example.individualprojectspringboot.repository;
import com.example.individualprojectspringboot.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

    @Repository
    public interface PackageRepository extends JpaRepository<Package, Integer> {

    }


