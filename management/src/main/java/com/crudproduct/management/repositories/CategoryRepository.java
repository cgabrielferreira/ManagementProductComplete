package com.crudproduct.management.repositories;

import com.crudproduct.management.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
