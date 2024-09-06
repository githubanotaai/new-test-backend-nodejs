package tech.joelf.anotaai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tech.joelf.anotaai.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
