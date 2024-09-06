package tech.joelf.anotaai.dtos.request;

public class UpdateCategoryDtoIn {
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
