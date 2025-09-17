package EcoApp.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import EcoApp.demo.entity.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product,String >{
	
}
