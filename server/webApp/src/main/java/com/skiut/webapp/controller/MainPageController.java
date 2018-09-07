package com.skiut.webapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
@Controller
public class MainPageController
{
	@RequestMapping("/mainPage")
	String mainPage(Model model,HttpSession session ) {
		return "mainPage"; // src/main/ressources/template/+$x+.html
	}

}
