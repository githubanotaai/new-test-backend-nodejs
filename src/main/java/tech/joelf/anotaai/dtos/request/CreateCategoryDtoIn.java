package tech.joelf.anotaai.dtos.request;

public class CreateCategoryDtoIn {
    private String title;
    private String description;
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
