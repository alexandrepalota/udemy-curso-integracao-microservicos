package br.com.cursoudemy.productapi.service;

import br.com.cursoudemy.productapi.model.Category;
import br.com.cursoudemy.productapi.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category save(Category entity) {
        return categoryRepository.save(entity);
    }
}
