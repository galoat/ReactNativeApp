package com.skiut.personneclient.restController.controller.feignClient;

import com.skiut.personneclient.entity.Feed;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;


@FeignClient("feedinfo-service")
public interface FeignFeedService {

    @RequestMapping(method =  RequestMethod.GET, value = "/feed")
    Resources<Feed> getFeeds();

}
