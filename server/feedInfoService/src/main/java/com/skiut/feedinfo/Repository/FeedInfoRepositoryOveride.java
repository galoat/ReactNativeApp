package com.skiut.feedinfo.Repository;

import com.skiut.feedinfo.Entity.FeedInfo;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;

@RepositoryRestController(path = "feed")
public class FeedInfoRepositoryOveride {

    @Getter
    @Setter
    @Autowire
    FeedInfoRepository feedRepo;


    private Logger logger = LoggerFactory.getLogger(FeedInfoRepositoryOveride.class);

    @RequestMapping(value = "/feed", method = RequestMethod.POST)
    public void postFeed(FeedInfo feedInfo) {
       logger.info("postFeed test with "+feedInfo.getFeed());
       feedRepo.save(feedInfo);
    }
}
