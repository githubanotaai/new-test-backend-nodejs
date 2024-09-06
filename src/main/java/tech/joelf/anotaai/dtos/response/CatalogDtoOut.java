package tech.joelf.anotaai.dtos.response;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CatalogDtoOut {
    private OwnerDtoOut owner;
    private List<CatalogItemDtoOut> catalog = new ArrayList<>();

    public CatalogDtoOut() {
    }

    public CatalogDtoOut(OwnerDtoOut owner, List<CatalogItemDtoOut> catalog) {
        this.owner = owner;
        this.catalog = catalog;
    }

    public OwnerDtoOut getOwner() {
        return owner;
    }

    public List<CatalogItemDtoOut> getCatalog() {
        return Collections.unmodifiableList(catalog);
    }
}
