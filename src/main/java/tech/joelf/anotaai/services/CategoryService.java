package tech.joelf.anotaai.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import tech.joelf.anotaai.dtos.request.CreateCategoryDtoIn;
import tech.joelf.anotaai.dtos.request.UpdateCategoryDtoIn;
import tech.joelf.anotaai.dtos.response.CategoryDtoOut;
import tech.joelf.anotaai.dtos.response.OwnerDtoOut;
import tech.joelf.anotaai.models.Category;
import tech.joelf.anotaai.models.Owner;
import tech.joelf.anotaai.publishers.CatalogPublisher;
import tech.joelf.anotaai.repositories.CategoryRepository;

@Service
public class CategoryService {

    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;
    private final OwnerService ownerService;
    private final CatalogPublisher ownerPublisher;

    public CategoryService(CategoryRepository categoryRepository, ModelMapper modelMapper, OwnerService ownerService,
            CatalogPublisher ownerPublisher) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
        this.ownerService = ownerService;
        this.ownerPublisher = ownerPublisher;
    }

    @Transactional
    public CategoryDtoOut create(CreateCategoryDtoIn dto) {
        Category category = modelMapper.map(dto, Category.class);
        category.setOwner(modelMapper.map(ownerService.find(dto.getOwner()), Owner.class));

        ownerPublisher.publish(category.getOwner());
        return modelMapper.map(categoryRepository.save(category), CategoryDtoOut.class);
    }

    @Transactional
    public CategoryDtoOut update(Long id, UpdateCategoryDtoIn dto) {
        try {
            Category category = categoryRepository.getById(id);
            BeanUtils.copyProperties(dto, category, "owner", "id");

            ownerPublisher.publish(category.getOwner());
            return modelMapper.map(categoryRepository.save(category), CategoryDtoOut.class);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Owner not found.");
        }
    }

    public CategoryDtoOut find(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(RuntimeException::new);
        return modelMapper.map(category, CategoryDtoOut.class);
    }

    public List<CategoryDtoOut> findOwnerCategories(Long id) {
        List<Category> categories = categoryRepository.findOwnerCategories(id);
        return categories.stream().map(category -> modelMapper.map(category, CategoryDtoOut.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found.");
        }

        try {
            categoryRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Category is being used.");
        }
    }
}
