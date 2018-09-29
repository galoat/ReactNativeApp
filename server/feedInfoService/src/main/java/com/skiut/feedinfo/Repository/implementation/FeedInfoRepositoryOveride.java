package com.skiut.feedinfo.Repository.implementation;

import com.skiut.feedinfo.Entity.FeedInfo;
import com.skiut.feedinfo.Repository.FeedInfoRepository;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@RestController
@RequestMapping("/feed")
public class FeedInfoRepositoryOveride {

    @Getter
    @Setter
    @Autowired
    FeedInfoRepository feedRepo;


    private Logger logger = LoggerFactory.getLogger(FeedInfoRepositoryOveride.class);

    @RequestMapping(value = "/postfeed", method = RequestMethod.POST)
    public boolean postFeed(@RequestBody FeedInfo feedInfo) {

        try {
            feedInfo.setFeed(URLDecoder.decode( feedInfo.getFeed(), "UTF-8" ));
        } catch (UnsupportedEncodingException e) {
          logger.warn("can't decode feedINfo : " + feedInfo.getFeed());
          return false;
        }
        feedRepo.save(feedInfo);
        return true;
    }
}
