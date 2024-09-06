package tech.joelf.anotaai.services;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import tech.joelf.anotaai.dtos.response.OwnerDtoOut;
import tech.joelf.anotaai.models.Owner;
import tech.joelf.anotaai.repositories.OwnerRepository;

@Service
public class OwnerService {

    private final ModelMapper modelMapper;
    private final OwnerRepository ownerRepository;

    public OwnerService(OwnerRepository ownerRepository, ModelMapper modelMapper) {
        this.ownerRepository = ownerRepository;
        this.modelMapper = modelMapper;
    }

    public OwnerDtoOut find(Long id) {
        Owner owner = ownerRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(owner, OwnerDtoOut.class);
    }
}
