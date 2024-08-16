package io.assessment.inventory.controller;

import java.util.ArrayList;
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

import io.assessment.inventory.controller.dto.BatchPriceRequestDto;
import io.assessment.inventory.controller.dto.PackageDto;
import io.assessment.inventory.controller.dto.PriceRequestDto;
import io.assessment.inventory.controller.dto.PriceResponseDto;
import io.assessment.inventory.exception.PackageNotFoundException;
import io.assessment.inventory.exception.SupplierNotFoundException;
import io.assessment.inventory.model.Package;
import io.assessment.inventory.model.Supplier;
import io.assessment.inventory.service.PackageService;
import io.assessment.inventory.service.SupplierService;

@RestController
@RequestMapping("/api/packages")
public class PackageController {
    @Autowired
    private PackageService packageService;
    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }

    @PostMapping
    public Package addPackages(@RequestBody PackageDto packagedto) {
        Package packages = new Package();
        Supplier supplier = supplierService.getSupplierById(packagedto.getSupplier_id());
        packages.setPackageName(packagedto.getPackageName());
        packages.setAddress(packagedto.getAddress());
        packages.setQuantity(packagedto.getQuantity());
        packages.setPricePerUnit(packagedto.getPricePerUnit());
        packages.setSupplier(supplier);
        return packageService.savePackage(packages);
    }

    @GetMapping("/{id}")
    public Package getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id);
    }

    @PutMapping("/{id}")
    public Package updatePackage(@PathVariable Long id, @RequestBody PackageDto packagedto) {
        Package existingPackage = packageService.getPackageById(id);
        System.out.println(packagedto.toString());
        if (existingPackage == null) {
            throw new PackageNotFoundException("Package not found with id " + id);
        }
        if (packagedto.getPackageName() != null) {
            existingPackage.setPackageName(packagedto.getPackageName());
        }
        if (packagedto.getAddress() != null) {
            existingPackage.setAddress(packagedto.getAddress());
        }
        if (packagedto.getQuantity() != null) {
            existingPackage.setQuantity(packagedto.getQuantity());
        }
        if (packagedto.getPricePerUnit() != null){
            existingPackage.setPricePerUnit(packagedto.getPricePerUnit());
        }
        if (packagedto.getSupplier_id() != null) {
            Supplier newSupplier = supplierService.getSupplierById(packagedto.getSupplier_id());
            if (newSupplier == null) {
                throw new SupplierNotFoundException("Supplier not found with id " + packagedto.getSupplier_id());
            }
            System.out.println(newSupplier.getId());
            existingPackage.setSupplier(newSupplier);

        }
        return packageService.savePackage(existingPackage);
    }

    @PostMapping("/totalprice")
    public List<PriceResponseDto> getTotalPrice(@RequestBody BatchPriceRequestDto batchRequest) {
        List<PriceResponseDto> responses = new ArrayList<>();
        for(PriceRequestDto p: batchRequest.getPackages()){
            Long id=p.getId();
            Long reqqtn=p.getQuantity();
            Package pkg = packageService.getPackageById(id);
            if (pkg == null) {
                throw new PackageNotFoundException("Package not found with id " + id);
            }
            if (reqqtn > pkg.getQuantity()) {
                throw new IllegalArgumentException("Requested quantity exceeds available quantity");
            }
            Supplier supplier = pkg.getSupplier();
            if (supplier == null) {
                throw new SupplierNotFoundException("Supplier not found for package with id " + id);
            }
            Double discount = supplier.getDiscount();
            if (discount == null) {
                discount = 0.0;
            }
            Double totalPriceBeforeDiscount = reqqtn * pkg.getPricePerUnit();
            Double totalPriceAfterDiscount = totalPriceBeforeDiscount;
            if (totalPriceBeforeDiscount > 10000) {
                totalPriceAfterDiscount = totalPriceBeforeDiscount * (1 - discount / 100);
            }
            PriceResponseDto response = new PriceResponseDto(totalPriceBeforeDiscount, totalPriceAfterDiscount, discount);
            responses.add(response);
        }
        return responses;

    }

    @DeleteMapping("/{id}")
    public void deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
    }

}
