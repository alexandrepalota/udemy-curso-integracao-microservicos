package br.com.cursoudemy.productapi.repositories;

import br.com.cursoudemy.productapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
