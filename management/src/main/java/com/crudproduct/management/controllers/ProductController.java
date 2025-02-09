package com.crudproduct.management.controllers;

import com.crudproduct.management.entities.Product;
import com.crudproduct.management.services.ManagementService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * Controller responsável pelas operações CRUD e relacionamentos de produtos.
 */
@Api(tags = "Produtos")
@RestController
@RequestMapping("/management/products")
public class ProductController {

    @Autowired
    private ManagementService managementService;

    /**
     * Endpoint para listar todos os produtos.
     *
     * @return A lista de todos os produtos.
     */
    @ApiOperation(value = "Obter todos os produtos", response = Product.class)
    @GetMapping
    public List<Product> getAllProducts() {
        return managementService.getAllProducts();
    }

    /**
     * Endpoint para criar um produto.
     *
     * @param product O produto a ser criado.
     * @return O produto criado.
     */
    @ApiOperation(value = "Criar um produto", response = Product.class)
    @PostMapping("/single")
    public Product createSingleProduct(@RequestBody Product product) {
        return managementService.createProductWithCategoryAndSupplier(product);
    }

    /**
     * Endpoint para buscar um produto pelo ID.
     *
     * @param id O ID do produto.
     * @return O produto correspondente ao ID fornecido.
     */
    @ApiOperation(value = "Buscar um produto pelo ID", response = Product.class)
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return managementService.getProductById(id);
    }

    /**
     * Endpoint para criar um produto com categoria e fornecedor.
     *
     * @param product O produto a ser criado.
     * @return O produto criado.
     */
    @ApiOperation(value = "Criar um produto com categoria e fornecedor", response = Product.class)
    @PostMapping
    public ResponseEntity<Product> createProductWithCategoryAndSupplier(@RequestBody Product product) {
        // Verifica se o fornecedor e a categoria estão presentes
        if (product.getSupplier() == null || product.getCategory() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fornecedor e Categoria são obrigatórios.");
        }
        Product createdProduct = managementService.createProductWithCategoryAndSupplier(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    /**
     * Endpoint para atualizar um produto.
     *
     * @param id O ID do produto a ser atualizado.
     * @param product O objeto produto com as atualizações.
     * @return O produto atualizado.
     */
    @ApiOperation(value = "Atualizar um produto", response = Product.class)
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return managementService.updateProduct(id, product);
    }

    /**
     * Endpoint para deletar um produto.
     *
     * @param id O ID do produto a ser deletado.
     */
    @ApiOperation(value = "Deletar um produto")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        managementService.deleteProduct(id);
    }

    /**
     * Endpoint para atualizar o fornecedor associado ao produto.
     *
     * @param productId O ID do produto.
     * @param supplierId O ID do fornecedor.
     * @return O produto atualizado com o novo fornecedor.
     */
    @ApiOperation(value = "Atualizar o fornecedor de um produto", response = Product.class)
    @PutMapping("/{productId}/supplier/{supplierId}")
    public Product updateProductSupplier(@PathVariable Long productId, @PathVariable Long supplierId) {
        return managementService.updateProductSupplier(productId, supplierId);
    }

    /**
     * Endpoint para atualizar a categoria associada ao produto.
     *
     * @param productId O ID do produto.
     * @param categoryId O ID da categoria.
     * @return O produto atualizado com a nova categoria.
     */
    @ApiOperation(value = "Atualizar a categoria de um produto", response = Product.class)
    @PutMapping("/{productId}/category/{categoryId}")
    public Product updateProductCategory(@PathVariable Long productId, @PathVariable Long categoryId) {
        return managementService.updateProductCategory(productId, categoryId);
    }
}