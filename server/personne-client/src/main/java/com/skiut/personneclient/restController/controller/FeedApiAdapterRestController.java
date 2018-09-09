package com.skiut.personneclient.restController.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.skiut.personneclient.entity.Feed;
import com.skiut.personneclient.restController.controller.feignClient.FeignFeedService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.var;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@AllArgsConstructor
@Data
@RestController
@RequestMapping("/feed")
public class FeedApiAdapterRestController {




    @Autowired
    private FeignFeedService feignFeedService;

    public String fallbackFeed(){return StringUtils.EMPTY;}

    @HystrixCommand(fallbackMethod = "fallbackFeed")
    @GetMapping("/getAll")
    public String allFeeds(){
        log.info("Content : "+ getFeignFeedService().getFeeds()
                .getContent());



        JSONArray jsonArray = new JSONArray();
        for(Feed a :  getFeignFeedService().getFeeds().getContent()){
            JSONObject j1 = new JSONObject();
            try {
                j1.put ("feed", a.getFeed());
                jsonArray.put(j1);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return jsonArray.toString();

    }

}
