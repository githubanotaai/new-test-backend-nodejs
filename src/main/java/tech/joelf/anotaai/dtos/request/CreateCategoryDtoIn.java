package tech.joelf.anotaai.dtos.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreateCategoryDtoIn {
    @NotBlank
    private String title;
    private String description;

    @NotNull
    private Long owner;

    public CreateCategoryDtoIn() {
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getOwner() {
        return owner;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }
}
