package tech.joelf.anotaai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tech.joelf.anotaai.models.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {

}
