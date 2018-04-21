package com.skiut.personneclient.restController;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.skiut.personneclient.entity.Personne;
import com.skiut.personneclient.restController.feignClient.FeignPersonneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    @HystrixCommand(fallbackMethod = "fallbackNames")
    @GetMapping("/names")
    public Collection<String> names() {
        return feignPersonneService.read()
                .getContent()
                .stream()
                .map(Personne::getName)
                .collect(Collectors.toList());
    }
}
