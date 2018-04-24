package com.skiut.personneclient.restController.feignClient;

import com.skiut.personneclient.entity.Personne;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient("personne-service")
public interface FeignPersonneService {

    @RequestMapping(method =  RequestMethod.GET, value = "/personnes")
    Resources<Personne> getPersonne();

    @RequestMapping(method =  RequestMethod.GET, value = "/personne/canlogin")
    @ResponseBody
    Boolean canLogIn(@RequestParam(value = "name") String name, @RequestParam(value = "password") String password);

}
