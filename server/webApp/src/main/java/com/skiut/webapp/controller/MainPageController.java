package com.skiut.webapp.controller;

import com.skiut.webapp.controller.constant.SessionConstant;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

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
	String sendRichText(@RequestBody String text, HttpSession session, @Value("${url_sendRichText}")String url){

		try {
			logger.info("Rich String to send "+  URLDecoder.decode( text, "UTF-8" ));
		} catch (UnsupportedEncodingException e) {
			logger.warn("error decoding html send "+e.toString());
		}

		String token = (String) session.getAttribute(SessionConstant.token);
		if(StringUtils.isEmpty(token)){
			logger.warn("token is null");
		}
		HttpClient httpclient = new DefaultHttpClient();
		HttpPost httppost = new HttpPost(url);
		httppost.setHeader("Authorization", "bearer " + token);
		httppost.setHeader("Content-Type", "application/json " );

		try {

			JSONObject json = new JSONObject();
			json.put("feed", text);
			StringEntity params = new StringEntity(json.toString());
			httppost.setEntity(params);



			HttpResponse response = httpclient.execute(httppost);
			logger.info("response "+EntityUtils.toString(response.getEntity()));

		}catch (Exception e) {
			logger.error(e.toString());
		}
		// Execute HTTP Post Request

		return "mainPage";
	}
}
