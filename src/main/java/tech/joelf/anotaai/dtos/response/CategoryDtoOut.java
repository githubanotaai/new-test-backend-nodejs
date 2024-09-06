package tech.joelf.anotaai.dtos.response;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CategoryDtoOut {
    private Long id;
    private String title;
    private String description;
    private OwnerDtoOut owner;
    private List<ProductDtoOut> products = new ArrayList<>();

    public CategoryDtoOut() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public OwnerDtoOut getOwner() {
        return owner;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setOwner(OwnerDtoOut owner) {
        this.owner = owner;
    }

    public List<ProductDtoOut> getProducts() {
        return Collections.unmodifiableList(products);
    }

    public void setProducts(List<ProductDtoOut> products) {
        this.products = products;
    }
}
