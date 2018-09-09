package com.skiut.personneclient.restController.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.skiut.personneclient.entity.Feed;
import com.skiut.personneclient.restController.controller.feignClient.FeignFeedService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Data
@RestController
@RequestMapping("/feed")
public class FeedApiAdapterRestController {




    @Autowired
    private FeignFeedService feignFeedService;

    public Collection<String> fallbackFeed(){return new ArrayList<>();}

    @HystrixCommand(fallbackMethod = "fallbackFeed")
    @GetMapping("/getAll")
    public Collection<String> allFeeds(){
        log.info("Content : "+ getFeignFeedService().getFeeds()
                .getContent());

        return getFeignFeedService().getFeeds()
                .getContent()
                .stream()
                .map(Feed::getFeed)
                .collect(Collectors.toList());
    }

}
