package com.skiut.personneclient.restController;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.oracle.tools.packager.Log;
import com.skiut.personneclient.entity.Personne;
import com.skiut.personneclient.restController.feignClient.FeignPersonneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Boolean canLogIn(@RequestHeader("name")String name, @RequestHeader("password")String password){
        Log.info("request log In with "+name+" password "+password);
        return feignPersonneService.canLogIn(name, password);
    }
}
