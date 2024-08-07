package io.assessment.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.assessment.inventory.controller.dto.PackageDto;
import io.assessment.inventory.exception.PackageNotFoundException;
import io.assessment.inventory.model.Package;
import io.assessment.inventory.service.PackageService;

@RestController
@RequestMapping("/api/packages")
public class PackageController {
    @Autowired
    private PackageService packageService;

    @GetMapping
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }
    @PostMapping
    public Package addPackages(@RequestBody PackageDto packagedto) {
        Package packages=new Package();
        packages.setPackageName(packagedto.getPackageName());
        packages.setDetails(packagedto.getDetails());
        packages.setQuantity(packagedto.getQuantity());
        return packageService.savePackage(packages);
    }
    @GetMapping("/{id}")
    public Package getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id);
    }
    @PutMapping("/{id}")
    public Package updatePackage(@PathVariable Long id, @RequestBody PackageDto packagedto) {
        Package existingPackage = packageService.getPackageById(id);
        if (existingPackage == null) {
            throw new PackageNotFoundException("Package not found with id " + id);
        }
        if (packagedto.getPackageName() != null) {
            existingPackage.setPackageName(packagedto.getPackageName());
        }
        if (packagedto.getDetails() != null) {
            existingPackage.setDetails(packagedto.getDetails());
        }
        if (packagedto.getQuantity() != null) {
            existingPackage.setQuantity(packagedto.getQuantity());
        }
        return packageService.savePackage(existingPackage);
    }
    @DeleteMapping("/{id}")
    public void deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
    }

}
