package io.assessment.inventory.repository;

import io.assessment.inventory.model.Package;


import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<Package, Long> {

}