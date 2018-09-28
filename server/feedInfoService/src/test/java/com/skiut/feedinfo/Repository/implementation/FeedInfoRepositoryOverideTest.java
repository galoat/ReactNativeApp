package com.skiut.feedinfo.Repository.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skiut.feedinfo.Entity.FeedInfo;
import com.skiut.feedinfo.Repository.FeedInfoRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.Assert.*;
import static org.mockito.BDDMockito.given;


@RunWith(SpringRunner.class)
@WebMvcTest(FeedInfoRepositoryOveride.class)
public class FeedInfoRepositoryOverideTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    FeedInfoRepository createClientServiceMock;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    public void postFeed() {

     /*   FeedInfo feedInfo = new FeedInfo();
        given(createClientServiceMock.save(f)).willReturn(f);

        mockMvc.perform(post("/clients")

                .contentType(MediaType.APPLICATION_JSON)

                .content(objectMapper.writeValueAsBytes(new CreateClientRequest("Foo"))))

                .andExpect(status().isCreated())

                .andExpect(jsonPath("$.name", is("Foo")))

                .andExpect(jsonPath("$.number", notNullValue()));*/
    }
}