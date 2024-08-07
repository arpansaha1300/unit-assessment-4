package io.assessment.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.assessment.inventory.model.Admin;
import io.assessment.inventory.model.Supplier;
import io.assessment.inventory.repository.AdminRepository;
import io.assessment.inventory.repository.SupplierRepository;

@Service
public class AuthService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    SupplierRepository supplierRepository;

    public String login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return "Admin login successful";
        }
        Supplier supplier = supplierRepository.findByEmail(email);
        if (supplier != null && supplier.getPassword().equals(password)) {
            return "Supplier login successful";
        }

        return "Invalid email or password";
    }
}
