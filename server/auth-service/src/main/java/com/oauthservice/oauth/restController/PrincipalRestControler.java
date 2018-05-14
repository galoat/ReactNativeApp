package com.oauthservice.oauth.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

 @RestController
public class PrincipalRestControler {


	@RequestMapping("/user") Principal principal (Principal p){
		return p;
	}

}
