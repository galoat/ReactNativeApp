package com.skiut.personneservice.stream;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import reactor.core.publisher.Flux;

@EnableBinding(Sink.class)
public class PersonneMessage {

    @Setter
    private final PersonneRepository personneRepository;

    @Autowired
    public PersonneMessage(PersonneRepository personneRepository) {
        this.personneRepository = personneRepository;
    }

    @StreamListener
    public void process(@Input(Sink.INPUT) Flux<String> incoming){
        incoming.map(s-> new Personne(null, s))
        .flatMap(s -> personneRepository.save(s))
                .subscribe(it -> System.out.println("saved "+ it.getName() +" withId" + it.getId()));


    }
}
