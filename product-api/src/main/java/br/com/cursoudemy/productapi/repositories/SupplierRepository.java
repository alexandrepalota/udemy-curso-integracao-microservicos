package br.com.cursoudemy.productapi.repositories;

import br.com.cursoudemy.productapi.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
