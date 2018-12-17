package com.skiut.personneservice.Repository;

import com.skiut.personneservice.Entity.Personne;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.repository.query.Param;


public interface PersonneRepository extends ReactiveMongoRepository<Personne, String>
{
    Personne findByName(@Param("name") String name);
    Boolean existsByName(@Param("name") String name);
}
