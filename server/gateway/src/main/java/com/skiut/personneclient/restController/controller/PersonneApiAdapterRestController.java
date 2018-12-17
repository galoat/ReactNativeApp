package com.skiut.personneclient.restController.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

import com.skiut.personneclient.entity.Personne;
import com.skiut.personneclient.restController.controller.feignClient.FeignPersonneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/personnes")
public class PersonneApiAdapterRestController {

    @Autowired
    private  FeignPersonneService feignPersonneService ;


    public PersonneApiAdapterRestController() {
    }

    public PersonneApiAdapterRestController(FeignPersonneService feignPersonneService) {
        this.feignPersonneService = feignPersonneService;
    }

    public Collection<String> fallbackNames(){
        return new ArrayList<>();
    }

    public Boolean callbackLogIn(){ return false;}

    @HystrixCommand(fallbackMethod = "fallbackNames")
    @GetMapping("/names")
    public Collection<String> names() {
        return feignPersonneService.getPersonne()
                .getContent()
                .stream()
                .map(Personne::getName)
                .collect(Collectors.toList());
    }



    @GetMapping("/login")
    public Boolean canLogIn(@RequestParam(value = "name") String name, @RequestParam(value = "password") String password) {
        return feignPersonneService.canLogIn(name, password);
    }
}
