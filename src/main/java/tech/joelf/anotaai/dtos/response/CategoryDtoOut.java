package tech.joelf.anotaai.dtos.response;

public class CategoryDtoOut {
    private String title;
    private String description;
    private OwnerDtoOut owner;

    public CategoryDtoOut() {
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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setOwner(OwnerDtoOut owner) {
        this.owner = owner;
    }
}
