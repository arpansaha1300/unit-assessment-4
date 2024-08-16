package io.assessment.inventory.controller;

import io.assessment.inventory.controller.dto.SupplierDto;
import io.assessment.inventory.exception.SupplierNotFoundException;
import io.assessment.inventory.model.Supplier;
import io.assessment.inventory.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.http.HttpHeaders;
import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @PostMapping
    public ResponseEntity<?> addSupplier(@RequestBody SupplierDto supplierDto) {
        if (supplierService.emailExists(supplierDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already exists. Please use a different email.");
        }
        Supplier supplier = new Supplier();
        supplier.setName(supplierDto.getName());
        supplier.setEmail(supplierDto.getEmail());
        supplier.setContactInfo(supplierDto.getContactInfo());
        supplier.setRole("supplier");
        supplier.setDiscount(supplierDto.getDiscount());
        Supplier savedSupplier = supplierService.saveSupplier(supplier);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSupplier);
    }

    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

    @PutMapping("/{id}")
    public Supplier updateSupplier(@PathVariable Long id, @RequestBody SupplierDto supplierdto) {
        Supplier existingSupplier = supplierService.getSupplierById(id);
        if (existingSupplier == null) {
            throw new SupplierNotFoundException("Supplier not found with id " + id);
        }
        // if (supplierdto.getName() != null) {
        //     existingSupplier.setName(supplierdto.getName());
        // }
        // if (supplierdto.getEmail() != null) {
        //     existingSupplier.setEmail(supplierdto.getEmail());
        // }
        if (supplierdto.getContactInfo() != null) {
            existingSupplier.setContactInfo(supplierdto.getContactInfo());
        }
        if (supplierdto.getDiscount() != null){
            existingSupplier.setDiscount(supplierdto.getDiscount());
        }
        return supplierService.saveSupplier(existingSupplier);
    }

    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
    }

    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        if (file.isEmpty() || !(file.getContentType().equals("image/png") || file.getContentType().equals("image/jpeg"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only PNG and JPEG images are allowed.");
        }
        try {
            Supplier supplier = supplierService.getSupplierById(id);
            if (supplier == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Supplier not found.");
            }
            supplier.setProfileImage(file.getBytes());
            supplierService.saveSupplier(supplier);
            return ResponseEntity.ok("Image uploaded successfully.");
        } 
        catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image.");
        }
    }
    
}
