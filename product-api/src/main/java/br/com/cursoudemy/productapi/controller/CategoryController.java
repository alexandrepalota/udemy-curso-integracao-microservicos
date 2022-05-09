package br.com.cursoudemy.productapi.controller;

import br.com.cursoudemy.productapi.dto.CategoryRequest;
import br.com.cursoudemy.productapi.dto.CategoryResponse;
import br.com.cursoudemy.productapi.model.Category;
import br.com.cursoudemy.productapi.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@RequestBody @Valid CategoryRequest request) {
        var obj = mapper.map(request, Category.class);
        var entity = categoryService.save(obj);
        var uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(entity.getId()).toUri();
        return ResponseEntity.created(uri).body(mapper.map(entity, CategoryResponse.class));
    }
}
