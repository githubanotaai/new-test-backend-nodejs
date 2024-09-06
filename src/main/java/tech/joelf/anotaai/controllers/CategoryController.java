package tech.joelf.anotaai.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import tech.joelf.anotaai.dtos.request.CreateCategoryDtoIn;
import tech.joelf.anotaai.dtos.request.UpdateCategoryDtoIn;
import tech.joelf.anotaai.dtos.response.CategoryDtoOut;
import tech.joelf.anotaai.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryDtoOut> create(@RequestBody @Valid CreateCategoryDtoIn dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDtoOut> update(@PathVariable Long id, @RequestBody @Valid UpdateCategoryDtoIn dto) {
        return ResponseEntity.ok(categoryService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
