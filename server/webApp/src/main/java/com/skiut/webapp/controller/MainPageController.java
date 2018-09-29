package com.skiut.webapp.controller;

import com.skiut.webapp.controller.constant.SessionConstant;
import org.apache.commons.lang.BooleanUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Controller
public class MainPageController
{

	private Logger logger = LoggerFactory.getLogger(MainPageController.class);

	@RequestMapping("/mainPage")
	String mainPage( HttpSession session ) {
		session.setAttribute("save", new Boolean(false));

		logger.info(" session "+ session.getAttribute("save"));

		return "mainPage";

	}


	@RequestMapping(value = "/sendrichtext",  method = RequestMethod.POST)
	@ResponseBody
	public String sendRichText(@RequestBody String text, HttpSession session, @Value("${url_sendRichText}")String url){

		try {
			logger.info("Rich String to send "+  URLDecoder.decode( text, "UTF-8" ));

			String token = (String) session.getAttribute(SessionConstant.token);
			if(StringUtils.isEmpty(token)){
				logger.warn("token is null");
			}
			HttpClient httpclient = new DefaultHttpClient();
			HttpPost httppost = new HttpPost(url);
			httppost.setHeader("Authorization", "bearer " + token);
			httppost.setHeader("Content-Type", "application/json " );


			JSONObject json = new JSONObject();
			json.put("feed", text);
			StringEntity params = new StringEntity(json.toString());
			httppost.setEntity(params);



			HttpResponse response = httpclient.execute(httppost);
			boolean result = BooleanUtils.toBoolean( EntityUtils.toString(response.getEntity()));
			logger.info("result  "+result);
			if(result == true){
				return new String("true") ;
			}
		} catch (UnsupportedEncodingException e) {
			logger.error(e.toString());

		}catch (Exception e) {
			logger.error(e.toString());

		}
		return new String("false") ;

	}
}
