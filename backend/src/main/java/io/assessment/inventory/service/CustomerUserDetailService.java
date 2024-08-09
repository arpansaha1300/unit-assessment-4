package io.assessment.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.assessment.inventory.model.Admin;
import io.assessment.inventory.repository.AdminRepository;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin=adminRepository.findByEmail(email);
        return admin;
    }
    
}
