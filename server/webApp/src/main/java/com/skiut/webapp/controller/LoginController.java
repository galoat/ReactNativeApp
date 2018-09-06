package com.skiut.webapp.controller;

import com.skiut.webapp.Entity.Personne;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * The type Login controller.
 */
@Controller
public class LoginController
{
	/**
	 * Login string.
	 *
	 * @param model the model
	 * @return the string
	 */
	@RequestMapping("/login")
	String login(Model model){
		model.addAttribute("personne", new Personne());
		return "login";
	}
}
