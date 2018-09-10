package com.skiut.personneclient.restController.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.skiut.personneclient.entity.Feed;
import com.skiut.personneclient.restController.controller.feignClient.FeignFeedService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The type Feed api adapter rest controller.
 */
@Slf4j
@AllArgsConstructor
@Data
@RestController
@RequestMapping("/feed")
public class FeedApiAdapterRestController {

    /**
     * The Feign feed service.
     */
    @Autowired
    private FeignFeedService feignFeedService;

    /**
     * Fallback feed string.
     *
     * @return the string
     */
    public String fallbackFeed(){return StringUtils.EMPTY;}

    /**
     * All feeds string.
     *
     * @return the string
     */
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

    /**
     * Add feed.
     *
     * @param feed the feed
     */
    @PostMapping("/feed")
    public void addFeed(@RequestBody Feed feed) {   
        feignFeedService.sendFeed(feed);
    }
}
