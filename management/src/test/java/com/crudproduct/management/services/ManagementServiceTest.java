package com.crudproduct.management.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.crudproduct.management.entities.Category;
import com.crudproduct.management.entities.Product;
import com.crudproduct.management.entities.Supplier;
import com.crudproduct.management.repositories.CategoryRepository;
import com.crudproduct.management.repositories.ManagementProductRepository;
import com.crudproduct.management.repositories.SupplierRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class ManagementServiceTest {

    @Mock
    private ManagementProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private SupplierRepository supplierRepository;

    @InjectMocks
    private ManagementService managementService;

    private Product product;
    private Supplier supplier;
    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("Electronics");

        supplier = new Supplier();
        supplier.setId(1L);
        supplier.setName("Tech Supplier");

        product = new Product();
        product.setId(1L);
        product.setName("Laptop");
        product.setDescription("Gaming Laptop");
        product.setPrice(BigDecimal.valueOf(1200.0));
        product.setStock(10);
        product.setCategory(category);
        product.setSupplier(supplier);
    }

    @Test
    public void testCreateProductWithCategoryAndSupplier_Success() {
        // Inicializando os objetos
        Supplier supplier = new Supplier();
        supplier.setId(1L);
        supplier.setName("Supplier Name");

        Category category = new Category();
        category.setId(1L);
        category.setName("Category Name");

        Product product = new Product();
        product.setName("Product 1");
        product.setSupplier(supplier);
        product.setCategory(category);

        // Definindo o comportamento dos mocks
        when(supplierRepository.findById(product.getSupplier().getId())).thenReturn(Optional.of(supplier));
        when(categoryRepository.findById(product.getCategory().getId())).thenReturn(Optional.of(category));
        when(productRepository.save(product)).thenReturn(product); // Mockando o save do repositório

        // Chamando o método
        Product result = managementService.createProductWithCategoryAndSupplier(product);

        // Verificando o resultado
        assertNotNull(result);  // A asserção de que o resultado não pode ser null
        assertEquals("Product 1", result.getName());
        assertEquals(supplier, result.getSupplier());
        assertEquals(category, result.getCategory());
    }

    @Test
    void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(Arrays.asList(product));
        List<Product> products = managementService.getAllProducts();
        assertEquals(1, products.size());
    }

    @Test
    void testGetProductById() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        Product foundProduct = managementService.getProductById(1L);
        assertEquals("Laptop", foundProduct.getName());
    }

    @Test
    void testUpdateProduct() {
        Product updatedProduct = new Product();
        updatedProduct.setName("Updated Laptop");
        updatedProduct.setDescription("Updated Description");
        updatedProduct.setPrice(BigDecimal.valueOf(1500.0));
        updatedProduct.setStock(5);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        Product result = managementService.updateProduct(1L, updatedProduct);
        assertEquals("Updated Laptop", result.getName());
    }

    @Test
    void testDeleteProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        doNothing().when(productRepository).delete(any(Product.class));
        assertDoesNotThrow(() -> managementService.deleteProduct(1L));
    }
}