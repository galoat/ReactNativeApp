package com.skiut.personneservice.Repository.RestRepository;

import com.skiut.personneservice.Entity.Personne;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path = "test")
public class PersonneRepository {

    @RequestMapping(path ="/login")
    public ResponseEntity<Boolean> login(@RequestParam("name")String name, @RequestParam("password")String password){
        return  new ResponseEntity<>(false, HttpStatus.OK);
    }
    @RequestMapping(path= "/test")
    public  Personne test(){
        return new Personne("test");
    }
}
