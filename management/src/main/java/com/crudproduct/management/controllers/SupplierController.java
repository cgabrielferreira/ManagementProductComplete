package com.crudproduct.management.controllers;

import com.crudproduct.management.entities.Supplier;
import com.crudproduct.management.services.ManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller responsável pelas operações CRUD de fornecedores.
 */
@RestController
@RequestMapping("/management/suppliers")
public class SupplierController {

    @Autowired
    private ManagementService managementService;

    /**
     * Endpoint para criar um fornecedor.
     *
     * @param supplier O fornecedor a ser criado.
     * @return O fornecedor criado.
     */
    @PostMapping
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return managementService.createSupplier(supplier);
    }

    /**
     * Endpoint para listar todos os fornecedores.
     *
     * @return A lista de todos os fornecedores.
     */
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return managementService.getAllSuppliers();
    }

    /**
     * Endpoint para buscar um fornecedor pelo ID.
     *
     * @param id O ID do fornecedor.
     * @return O fornecedor correspondente ao ID fornecido.
     */
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return managementService.getSupplierById(id);
    }

    /**
     * Endpoint para atualizar um fornecedor.
     *
     * @param id O ID do fornecedor a ser atualizado.
     * @param supplier O objeto fornecedor com as atualizações.
     * @return O fornecedor atualizado.
     */
    @PutMapping("/{id}")
    public Supplier updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        return managementService.updateSupplier(id, supplier);
    }

    /**
     * Endpoint para deletar um fornecedor.
     *
     * @param id O ID do fornecedor a ser deletado.
     */
    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        managementService.deleteSupplier(id);
    }
}
