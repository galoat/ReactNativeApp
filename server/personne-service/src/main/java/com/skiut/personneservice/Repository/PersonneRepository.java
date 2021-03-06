package com.skiut.personneservice.Repository;

import com.skiut.personneservice.Entity.Personne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PersonneRepository extends JpaRepository<Personne, Long>
{
    Personne findByName(@Param("name") String name);
    Boolean existsByName(@Param("name") String name);
}
