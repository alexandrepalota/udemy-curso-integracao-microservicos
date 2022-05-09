package br.com.cursoudemy.productapi.repositories;

import br.com.cursoudemy.productapi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
