package com.crudproduct.management.services;

import com.crudproduct.management.entities.Category;
import com.crudproduct.management.entities.Product;
import com.crudproduct.management.entities.Supplier;
import com.crudproduct.management.repositories.CategoryRepository;
import com.crudproduct.management.repositories.ManagementProductRepository;
import com.crudproduct.management.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Serviço responsável pelas operações de gerenciamento de produtos, fornecedores e categorias.
 */
@Service
public class ManagementService {

    @Autowired
    private ManagementProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    // Criação simples de um produto sem categoria ou fornecedor
    public Product createProduct(Product product) {
        // Se categoria ou fornecedor não forem fornecidos, o produto será criado sem essas dependências.
        if (product.getCategory() == null) {
            // Caso precise de alguma lógica adicional, pode ser inserido aqui.
        }

        if (product.getSupplier() == null) {
            // Caso precise de alguma lógica adicional, pode ser inserido aqui.
        }

        return productRepository.save(product);
    }

    /**
     * Cria um produto com categoria e fornecedor.
     *
     * @param product O produto a ser criado.
     * @return O produto criado.
     */
    public Product createProductWithCategoryAndSupplier(Product product) {
        // Verificar se os IDs de fornecedor e categoria são válidos
        if (product.getSupplier() == null || product.getCategory() == null) {
            throw new IllegalArgumentException("Fornecedor e Categoria são obrigatórios.");
        }

        // Obter fornecedor e categoria do banco de dados
        Optional<Supplier> supplierOpt = supplierRepository.findById(product.getSupplier().getId());
        Optional<Category> categoryOpt = categoryRepository.findById(product.getCategory().getId());

        if (supplierOpt.isEmpty() || categoryOpt.isEmpty()) {
            throw new IllegalArgumentException("Fornecedor ou Categoria não encontrados.");
        }

        // Atribuir o fornecedor e a categoria encontrados ao produto
        Supplier supplier = supplierOpt.get();
        Category category = categoryOpt.get();
        product.setSupplier(supplier);
        product.setCategory(category);

        // Salvar o produto no banco de dados
        return productRepository.save(product);  // Supondo que você tenha um productRepository configurado
    }


    /**
     * Lista todos os produtos.
     *
     * @return A lista de todos os produtos.
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Busca um produto por ID.
     *
     * @param id O ID do produto.
     * @return O produto correspondente ao ID fornecido.
     */
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    /**
     * Atualiza um produto.
     *
     * @param id O ID do produto a ser atualizado.
     * @param product O objeto produto com as atualizações.
     * @return O produto atualizado.
     */
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = getProductById(id);
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        return productRepository.save(existingProduct);
    }

    /**
     * Deleta um produto.
     *
     * @param id O ID do produto a ser deletado.
     */
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    /**
     * Atualiza o fornecedor de um produto.
     *
     * @param productId O ID do produto.
     * @param supplierId O ID do fornecedor.
     * @return O produto atualizado com o novo fornecedor.
     */
    public Product updateProductSupplier(Long productId, Long supplierId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        product.setSupplier(supplier);
        return productRepository.save(product);
    }

    /**
     * Atualiza a categoria de um produto.
     *
     * @param productId O ID do produto.
     * @param categoryId O ID da categoria.
     * @return O produto atualizado com a nova categoria.
     */
    public Product updateProductCategory(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.setCategory(category);
        return productRepository.save(product);
    }


    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
    }

    public Supplier updateSupplier(Long id, Supplier supplier) {
        Supplier existingSupplier = getSupplierById(id);
        existingSupplier.setName(supplier.getName());
        existingSupplier.setPhone(supplier.getPhone());
        return supplierRepository.save(existingSupplier);
    }

    public void deleteSupplier(Long id) {
        Supplier supplier = getSupplierById(id);
        supplierRepository.delete(supplier);
    }


    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public Category updateCategory(Long id, Category category) {
        Category existingCategory = getCategoryById(id);
        existingCategory.setName(category.getName());
        return categoryRepository.save(existingCategory);
    }

    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}