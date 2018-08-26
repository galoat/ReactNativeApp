package com.skiut.personneservice;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import com.skiut.personneservice.RestApi.PersonneApi;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@WebMvcTest(PersonneApi.class)
@ActiveProfiles("test")
public class PersonneServiceResourceTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private PersonneRepository personneRepository;

    @Test
    public void shouldGetAListOfVetsInJSonFormat() throws Exception {
        String name = "myName";

        Personne personne = new Personne();
        personne.setId((long) 1);
        personne.setName(name);

        given(personneRepository.existsByName(name)).willReturn(true);

        mvc.perform(get("/personne/canlogin")
                .param("name", name)
                .param("password", "ff;oerpkfoperk")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }
}
