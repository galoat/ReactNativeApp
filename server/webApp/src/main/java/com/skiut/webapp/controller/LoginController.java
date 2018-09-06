package com.skiut.webapp.controller;

import com.skiut.webapp.Entity.Personne;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

/**
 * The type Login controller.
 */
@Controller
public class LoginController
{


	private Logger logger = LoggerFactory.getLogger(LoginController.class);
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





	@RequestMapping(value = "/tryAuthentification", method = RequestMethod.POST)
	public String greetingSubmit(@ModelAttribute("personne") Personne personne, HttpSession session, Model model, @Value("${client_id}") String clientId,
					@Value("${client_secret}") String client_secret, @Value("${grant_type}") String grantType, @Value("${url_oAuthServeur}")String url) {

		logger.info(personne.toString());
		HttpClient httpclient = new DefaultHttpClient();
		HttpPost httppost = new HttpPost(url);
		httppost.setHeader("Authorization", "Basic " +  Base64.getEncoder().encodeToString((clientId+":"+client_secret).getBytes()));
		httppost.addHeader("accept", "application/json");

		try {
			List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
			nameValuePairs.add(new BasicNameValuePair("grant_type",grantType));
			nameValuePairs.add(new BasicNameValuePair("username", personne.getName()));
			nameValuePairs.add(new BasicNameValuePair("password", personne.getPassword()));
			nameValuePairs.add(new BasicNameValuePair("client_id", clientId));
			nameValuePairs.add(new BasicNameValuePair("client_secret", client_secret));
			httppost.setEntity(new UrlEncodedFormEntity(nameValuePairs));

			// Execute HTTP Post Request
			HttpResponse response = httpclient.execute(httppost);

			JSONObject json_auth = new JSONObject(EntityUtils.toString(response.getEntity()));
			if(json_auth.has("access_token")) {
				String token = json_auth.getString("access_token");
				session.setAttribute("token",token);
				session.setAttribute("name",personne.getName());
				return  "mainPage";
			}else if( json_auth.has("error")){
				System.out.println("erreur authenification");
				model.addAttribute("loged",false);
				return "login";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}


		//TODO Create a page errorPage
		return "errorPage";


	}
}
