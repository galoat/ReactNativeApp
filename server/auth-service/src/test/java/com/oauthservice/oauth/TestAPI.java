package com.oauthservice.oauth;

import com.oauthservice.oauth.entity.Account;
import com.oauthservice.oauth.repository.AccountRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Base64;
import java.util.stream.Stream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class TestAPI
{
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private MockMvc mockMvc;

	private static final String CLIENT_ID = "html5";
	private static final String CLIENT_SECRET = "secret";

	private static final String CONTENT_TYPE = "application/json;charset=UTF-8";
	@Before
	public void autoAdd(){
	//	this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

		Stream.of("jlong,spring","test,test","test2,test2" ).map(t->t.split(",")).
						forEach(t->this.accountRepository.save(new Account(t[0],t[1],true)));
	}

	private String obtainAccessToken(String username, String password) throws Exception {
		final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "password");
		params.add("client_id", CLIENT_ID);
		params.add("username", username);
		params.add("password", password);

		// @formatter:off

        ResultActions result = mockMvc.perform(post("/uaa/oauth/token")
                               .params(params)
				               .header("Authorization", new String(Base64.getEncoder().encode((CLIENT_ID+";"+CLIENT_SECRET).getBytes())))
                               .accept(CONTENT_TYPE))
                               .andExpect(status().isOk());
                        //       .andExpect(content().contentType(CONTENT_TYPE));

        // @formatter:on

		String resultString = result.andReturn().getResponse().getContentAsString();

		JacksonJsonParser jsonParser = new JacksonJsonParser();
		return jsonParser.parseMap(resultString).get("access_token").toString();
	}
	@Test
	public void givenInvalidRole_whenGetSecureRequest_thenForbidden() throws Exception {
		final String accessToken = obtainAccessToken("jlong", "spring");
		System.out.println("==================token:" + accessToken);
		//	mockMvc.perform(get("/employee").header("Authorization", "Bearer " + accessToken).param("email", EMAIL)).andExpect(status().isForbidden());
	}


}