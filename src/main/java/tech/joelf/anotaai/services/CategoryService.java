package tech.joelf.anotaai.services;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import tech.joelf.anotaai.dtos.request.CreateCategoryDtoIn;
import tech.joelf.anotaai.dtos.request.UpdateCategoryDtoIn;
import tech.joelf.anotaai.dtos.response.CategoryDtoOut;
import tech.joelf.anotaai.models.Category;
import tech.joelf.anotaai.repositories.CategoryRepository;

@Service
public class CategoryService {

    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;
    private final OwnerService ownerService;

    public CategoryService(CategoryRepository categoryRepository, ModelMapper modelMapper, OwnerService ownerService) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
        this.ownerService = ownerService;
    }

    @Transactional
    public CategoryDtoOut create(CreateCategoryDtoIn dto) {
        Category category = modelMapper.map(dto, Category.class);
        category.setOwner(ownerService.find(dto.getOwner()));

        return modelMapper.map(categoryRepository.save(category), CategoryDtoOut.class);
    }

    @Transactional
    public CategoryDtoOut update(Long id, UpdateCategoryDtoIn dto) {
        try {
            Category category = categoryRepository.getById(id);
            BeanUtils.copyProperties(dto, category, "owner", "id");

            return modelMapper.map(categoryRepository.save(category), CategoryDtoOut.class);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Owner not found.");
        }
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
