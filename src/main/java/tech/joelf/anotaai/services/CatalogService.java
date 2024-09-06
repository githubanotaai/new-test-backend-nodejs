package tech.joelf.anotaai.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import tech.joelf.anotaai.dtos.response.CatalogDtoOut;
import tech.joelf.anotaai.dtos.response.CatalogItemDtoOut;
import tech.joelf.anotaai.dtos.response.CategoryDtoOut;
import tech.joelf.anotaai.dtos.response.OwnerDtoOut;

@Service
public class CatalogService {

    private final CategoryService categoryService;
    private final ProductService productService;
    private final OwnerService ownerService;

    public CatalogService(CategoryService categoryService, ProductService productService, OwnerService ownerService) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.ownerService = ownerService;
    }

    public CatalogDtoOut generateCatalogByOwner(Long id) {
        OwnerDtoOut owner = ownerService.find(id);

        List<CategoryDtoOut> categories = categoryService.findOwnerCategories(id);
        categories.forEach(category -> category.setProducts(productService.findByCategory(category.getId())));

        List<CatalogItemDtoOut> catalogItems = categories.stream()
                .map(category -> new CatalogItemDtoOut(category.getTitle(), category.getDescription(),
                        category.getProducts()))
                .collect(Collectors.toList());

        return new CatalogDtoOut(owner, catalogItems);
    }
}
