package io.assessment.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.assessment.inventory.controller.dto.LoginDto;
import io.assessment.inventory.model.Supplier;
import io.assessment.inventory.repository.SupplierRepository;
import io.assessment.inventory.service.AuthService;
import io.assessment.inventory.service.SupplierService;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private SupplierService s;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        return authService.login(dto.getEmail(), dto.getPassword());
    }
    @PostMapping("/signup")
    public String handleSignUp(@RequestBody LoginDto body) {

      
        Supplier supplier = supplierRepository.findByEmail(body.getEmail());
        if (supplier != null) {
            if (supplier.getPassword() == null || supplier.getPassword().isEmpty()) {
               
                supplier.setPassword(body.getPassword());
                s.saveSupplier(supplier);
                return "Password set for supplier.";
            } else {
                
                return "Supplier already has a password.";
            }
        }
        return "Error: Email does not exist";
    }
}