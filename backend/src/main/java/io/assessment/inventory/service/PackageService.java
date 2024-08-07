package io.assessment.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.assessment.inventory.model.Package;
import io.assessment.inventory.repository.PackageRepository;

@Service
public class PackageService {
    @Autowired
    private PackageRepository packageRepository;

    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    public Package getPackageById(Long id) {
        return packageRepository.findById(id).orElse(null);
    }

    public Package savePackage(Package packages) {
        return packageRepository.save(packages);
    }

    public void deletePackage(Long id) {
        packageRepository.deleteById(id);
    }
}
