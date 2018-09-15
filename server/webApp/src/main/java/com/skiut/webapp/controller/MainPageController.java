package com.skiut.webapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
@Controller
public class MainPageController
{

	private Logger logger = LoggerFactory.getLogger(MainPageController.class);

	@RequestMapping("/mainPage")
	String mainPage(Model model,HttpSession session ) {

		model.addAttribute("text", new String());
		return "mainPage"; // src/main/ressources/template/+$x+.html
	}


	@RequestMapping("/sendrichtext")
	String sendRichText(@ModelAttribute("text") String text){
		logger.info("Rich String to send "+ text);

		return "mainPage";
	}
}
