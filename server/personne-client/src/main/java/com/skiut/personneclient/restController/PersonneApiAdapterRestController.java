package com.skiut.personneclient.restController;

import com.skiut.personneclient.entity.Personne;
import com.skiut.personneclient.restController.feignClient.FeignPersonneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    @GetMapping("/names")
    public Collection<String> names() {
        System.out.println("==================="+feignPersonneService);
        return feignPersonneService.read()
                .getContent()
                .stream()
                .map(Personne::getName)
                .collect(Collectors.toList());
    }
}
