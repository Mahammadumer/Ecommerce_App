package EcoApp.demo;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import EcoApp.demo.controller.ProductController;
import EcoApp.demo.entity.Product;
import EcoApp.demo.service.ProductService;

@WebMvcTest(ProductController.class)
public class ProductServiceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    @Test
    void shouldReturnAllProducts() throws Exception {
        Product product = new Product("Lenovo", "Desc", "Electronics", 40000, "ghrt", 10);
        when(productService.findAll()).thenReturn(List.of(product));

        mockMvc.perform(get("/products/all"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].name").value("Lenovo"));
    }
}