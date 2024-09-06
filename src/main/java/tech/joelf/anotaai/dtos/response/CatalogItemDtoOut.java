package tech.joelf.anotaai.dtos.response;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CatalogItemDtoOut {
    private String category_title;
    private String category_description;
    private List<ProductDtoOut> itens = new ArrayList<>();

    public CatalogItemDtoOut() {
    }

    public CatalogItemDtoOut(String category_title, String category_description, List<ProductDtoOut> itens) {
        this.category_title = category_title;
        this.category_description = category_description;
        this.itens = itens;
    }

    public String getCategory_title() {
        return category_title;
    }

    public String getCategory_description() {
        return category_description;
    }

    public List<ProductDtoOut> getItens() {
        return Collections.unmodifiableList(itens);
    }

    public void setCategory_title(String category_title) {
        this.category_title = category_title;
    }

    public void setCategory_description(String category_description) {
        this.category_description = category_description;
    }

    public void setItens(List<ProductDtoOut> itens) {
        this.itens = itens;
    }
}
