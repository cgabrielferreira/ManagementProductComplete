package com.crudproduct.management.controllers;

import com.crudproduct.management.entities.Category;
import com.crudproduct.management.services.ManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller responsável pelas operações CRUD de categorias.
 */
@RestController
@RequestMapping("/management/categories")
public class CategoryController {

    @Autowired
    private ManagementService managementService;

    /**
     * Endpoint para criar uma categoria.
     *
     * @param category A categoria a ser criada.
     * @return A categoria criada.
     */
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return managementService.createCategory(category);
    }

    /**
     * Endpoint para listar todas as categorias.
     *
     * @return A lista de todas as categorias.
     */
    @GetMapping
    public List<Category> getAllCategories() {
        return managementService.getAllCategories();
    }

    /**
     * Endpoint para buscar uma categoria pelo ID.
     *
     * @param id O ID da categoria.
     * @return A categoria correspondente ao ID fornecido.
     */
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return managementService.getCategoryById(id);
    }

    /**
     * Endpoint para atualizar uma categoria.
     *
     * @param id O ID da categoria a ser atualizada.
     * @param category O objeto categoria com as atualizações.
     * @return A categoria atualizada.
     */
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return managementService.updateCategory(id, category);
    }

    /**
     * Endpoint para deletar uma categoria.
     *
     * @param id O ID da categoria a ser deletada.
     */
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        managementService.deleteCategory(id);
    }
}
