package tech.joelf.anotaai.dtos.request;

import java.math.BigDecimal;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class UpdateProductDtoIn {
    @NotBlank
    private String title;

    @Positive
    @NotNull
    private BigDecimal price;

    @NotNull
    private Long category;
    private String description;

    public UpdateProductDtoIn() {
    }

    public String getTitle() {
        return title;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Long getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
