package com.skiut.personneservice.RestApi;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Component
public class Router {

    private final PersonneRepository personneRepository;

    @Autowired
    public Router(PersonneRepository personneRepository) {
        this.personneRepository = personneRepository;
    }

    @Bean
    RouterFunction<ServerResponse> getPersonnes(){
        return route(RequestPredicates.GET("/personnes"), request -> ServerResponse.ok().body(personneRepository.findAll(), Personne.class));
    }
}
