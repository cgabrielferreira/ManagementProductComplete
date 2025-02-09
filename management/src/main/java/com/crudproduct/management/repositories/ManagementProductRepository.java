package com.crudproduct.management.repositories;

import com.crudproduct.management.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagementProductRepository extends JpaRepository<Product, Long> {
}
