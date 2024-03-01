package com.example.individualprojectspringboot.controller;

import com.example.individualprojectspringboot.entity.Package;
import com.example.individualprojectspringboot.pojo.PackagePojo;
import com.example.individualprojectspringboot.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/package")
@RestController
@RequiredArgsConstructor
public class PackageController {
    private final PackageService packageService;
    @PostMapping("/save")
    public String savePackage(@RequestBody @ModelAttribute PackagePojo packagePojo) throws IOException {
       packageService.savePackage(packagePojo);
        return "data created successfully yoh";
    }
    @GetMapping("/getAll")
    public List<Package> findAll(){
        return packageService.findAll();
    }
    @GetMapping("/getById/{id}")
    public Optional<Package> findById(@PathVariable("id") Integer id){
        return packageService.findById(id);
    }
    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        packageService.deleteById(id);
    }
    @PutMapping("/update/{id}")
    public String updatePackage(@PathVariable("id") Integer id, @RequestBody @ModelAttribute PackagePojo updatedPackagePojo) throws IOException {
        packageService.updatePackage(id, updatedPackagePojo);
        return "data updated successfully";
    }

}


