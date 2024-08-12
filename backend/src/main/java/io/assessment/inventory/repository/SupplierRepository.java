package io.assessment.inventory.repository;


import io.assessment.inventory.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Supplier findByEmail(String email);
    boolean existsByEmail(String email);
}
