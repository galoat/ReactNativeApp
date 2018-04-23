package com.skiut.personneservice.RestApi;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/personne")
public class PersonneApi
{
	@ResponseBody
	@RequestMapping(value ="canlogin", method = RequestMethod.GET, produces = "application/json")
	public boolean write(@RequestParam(value = "name") String name,@RequestParam(value = "password") String password) {
		/// TODO REPLACE by a log
		System.out.println("========="+name+" "+password);
		return false;
	}
}
