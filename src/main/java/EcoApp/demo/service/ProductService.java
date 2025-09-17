package EcoApp.demo.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import EcoApp.demo.config.BusinessException;
import EcoApp.demo.config.ResourcenotFoundException;
import EcoApp.demo.entity.Product;
import EcoApp.demo.repository.ProductRepository;

@Service
public class ProductService {

    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductRepository repo;

    public Product create(Product product) {
        log.info("Creating product: {}", product.getName());
        product.setId(null); // Ensure it's treated as a new entity
        validate(product);
        return repo.save(product);
    }

    public List<Product> findAll() {
        log.info("Finding all products");
        return repo.findAll();
    }

    public Product findById(String id) {
        log.info("Finding product by ID: {}", id);
        return repo.findById(id)
                   .orElseThrow(() -> {
                       log.error("Product not found: {}", id);
                       return new ResourcenotFoundException("Product not found: " + id);
                   });
    }

    public Product update(String id, Product product) {
        Product existingProduct = repo.findById(id)
                                      .orElseThrow(() -> {
                                          log.error("Attempted to update non-existing product ID: {}", id);
                                          return new ResourcenotFoundException("Product not found: " + id);
                                      });

        log.info("Updating product ID: {}", id);
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setTags(product.getTags());
        existingProduct.setStock(product.getStock());
        existingProduct.setPrice(product.getPrice());

        return repo.save(existingProduct);
    }

    public boolean delete(String id) {
        Product product = repo.findById(id)
                              .orElseThrow(() -> {
                                  log.error("Attempted to delete non-existing product ID: {}", id);
                                  return new ResourcenotFoundException("Product not found: " + id);
                              });

        log.info("Deleting product ID: {}", id);
        repo.deleteById(id);
        return true;
    }

    private void validate(Product product) {
        if (product.getPrice() < 0) {
            log.error("Price cannot be negative");
            throw new BusinessException("Price cannot be negative");
        }
        if (product.getStock() < 0) {
            log.error("Stock cannot be negative");
            throw new BusinessException("Stock cannot be negative");
        }
    }
}