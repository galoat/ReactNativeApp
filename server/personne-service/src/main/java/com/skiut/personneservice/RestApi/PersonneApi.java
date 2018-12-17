package com.skiut.personneservice.RestApi;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/personne")
public class PersonneApi
{
	private final PersonneRepository personneRepository;

	@Autowired
	public PersonneApi(PersonneRepository personneRepository) {
		this.personneRepository = personneRepository;
	}

	@ResponseBody
	@RequestMapping(value ="canlogin", method = RequestMethod.GET, produces = "application/json")
	public boolean write(@RequestParam(value = "name") String name,@RequestParam(value = "password") String password) {
		/// TODO REPLACE by a log
		System.out.println("========="+name+" "+password);
		if(personneRepository.existsByName(name))
		{
			return true;
		}else{
			return false;
		}

	}
}
