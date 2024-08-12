package io.assessment.inventory.repository;

import io.assessment.inventory.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
    Admin findByPassword(String password);
}
