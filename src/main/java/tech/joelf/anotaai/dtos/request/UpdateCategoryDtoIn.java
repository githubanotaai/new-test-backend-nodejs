package tech.joelf.anotaai.dtos.request;

import javax.validation.constraints.NotBlank;

public class UpdateCategoryDtoIn {

    @NotBlank
    private String title;
    private String description;

    public UpdateCategoryDtoIn() {
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
