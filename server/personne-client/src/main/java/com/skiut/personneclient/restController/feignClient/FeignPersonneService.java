package com.skiut.personneclient.restController.feignClient;

import com.skiut.personneclient.entity.Personne;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient("personne-service")
public interface FeignPersonneService {

    @RequestMapping(method =  RequestMethod.GET, value = "/personnes")
    Resources<Personne> read();

}
