package tech.joelf.anotaai.services;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import tech.joelf.anotaai.dtos.request.CreateProductDtoIn;
import tech.joelf.anotaai.dtos.request.UpdateProductDtoIn;
import tech.joelf.anotaai.dtos.response.ProductDtoOut;
import tech.joelf.anotaai.models.Category;
import tech.joelf.anotaai.models.Owner;
import tech.joelf.anotaai.models.Product;
import tech.joelf.anotaai.publishers.OwnerPublisher;
import tech.joelf.anotaai.repositories.ProductRepository;

@Service
public class ProductService {

    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final OwnerService ownerService;
    private final CategoryService categoryService;
    private final OwnerPublisher ownerPublisher;

    public ProductService(ProductRepository productRepository, ModelMapper modelMapper, OwnerService ownerService,
            CategoryService categoryService, OwnerPublisher ownerPublisher) {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.ownerService = ownerService;
        this.categoryService = categoryService;
        this.ownerPublisher = ownerPublisher;
    }

    @Transactional
    public ProductDtoOut create(CreateProductDtoIn dto) {
        Owner owner = ownerService.find(dto.getOwner());
        Category category = modelMapper.map(categoryService.find(dto.getCategory()), Category.class);

        Product product = modelMapper.map(dto, Product.class);
        product.setOwner(owner);
        product.setCategory(category);

        ownerPublisher.publish(owner);
        return modelMapper.map(productRepository.save(product), ProductDtoOut.class);
    }

    @Transactional
    public ProductDtoOut update(Long id, UpdateProductDtoIn dto) {
        try {
            Product product = productRepository.getById(id);
            BeanUtils.copyProperties(dto, product, "owner", "id");

            ownerPublisher.publish(product.getOwner());
            return modelMapper.map(productRepository.save(product), ProductDtoOut.class);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Owner not found.");
        }
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found.");
        }

        try {
            productRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Product has dependencies.");
        }
    }
}
