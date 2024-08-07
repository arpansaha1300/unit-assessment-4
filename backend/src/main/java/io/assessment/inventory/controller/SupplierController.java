package io.assessment.inventory.controller;

import io.assessment.inventory.controller.dto.SupplierDto;
import io.assessment.inventory.exception.SupplierNotFoundException;
import io.assessment.inventory.model.Supplier;
import io.assessment.inventory.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Supplier addSupplier(@RequestBody SupplierDto supplierdto) {
        Supplier supplier=new Supplier();
        supplier.setName(supplierdto.getName());
        supplier.setEmail(supplierdto.getEmail());
        supplier.setPassword(supplierdto.getPassword());
        return supplierService.saveSupplier(supplier);
    }

    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

    // @PutMapping("/{id}")
    // public Supplier updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
    //     supplier.setId(id);
    //     return supplierService.saveSupplier(supplier);
    // }
    @PutMapping("/{id}")
    public Supplier updateSupplier(@PathVariable Long id, @RequestBody SupplierDto supplierdto) {
        Supplier existingSupplier = supplierService.getSupplierById(id);
        if (existingSupplier == null) {
            throw new SupplierNotFoundException("Supplier not found with id " + id);
        }
        if (supplierdto.getName() != null) {
            existingSupplier.setName(supplierdto.getName());
        }
        if (supplierdto.getPassword() != null) {
            existingSupplier.setPassword(supplierdto.getPassword());
        }
        if (supplierdto.getContactInfo() != null) {
            existingSupplier.setContactInfo(supplierdto.getContactInfo());
        }
        return supplierService.saveSupplier(existingSupplier);
    }

    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
    }
}
