package com.skiut.personneclient.restController.controller;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;


import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


@Component
public class Gateway {

    @Bean
    RouteLocator gateway(RouteLocatorBuilder builder){

      return builder.routes()
                .route(p -> p
                        .path("/personnes")
                        .uri("lb://personne-service/personnes"))
                .build();


    }
}
