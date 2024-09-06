package tech.joelf.anotaai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tech.joelf.anotaai.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
