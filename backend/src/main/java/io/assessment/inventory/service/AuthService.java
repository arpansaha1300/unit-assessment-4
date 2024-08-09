package io.assessment.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.assessment.inventory.model.Admin;
import io.assessment.inventory.model.Supplier;
import io.assessment.inventory.repository.AdminRepository;
import io.assessment.inventory.repository.SupplierRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
public class AuthService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    SupplierRepository supplierRepository;

    @AllArgsConstructor
    @Getter
    @Setter
    class LoginResponse {
        private Long id;
        private String email;
        private String role;
    }

    public ResponseEntity<?> login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return ResponseEntity.ok(new LoginResponse(admin.getId(), admin.getEmail(), "ADMIN"));
        }
        Supplier supplier = supplierRepository.findByEmail(email);
        if (supplier != null && supplier.getPassword().equals(password)) {
            return ResponseEntity.ok(new LoginResponse(supplier.getId(), supplier.getEmail(), "SUPPLIER"));
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
