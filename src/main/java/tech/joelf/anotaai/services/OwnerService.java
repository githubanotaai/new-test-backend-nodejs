package tech.joelf.anotaai.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import tech.joelf.anotaai.models.Owner;
import tech.joelf.anotaai.repositories.OwnerRepository;

@Service
public class OwnerService {

    private final OwnerRepository ownerRepository;

    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public Owner find(Long id) {
        return ownerRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
