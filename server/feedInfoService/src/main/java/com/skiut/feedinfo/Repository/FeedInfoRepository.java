package com.skiut.feedinfo.Repository;

import com.skiut.feedinfo.Entity.FeedInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;


@RepositoryRestResource(collectionResourceRel = "feed" , path = "feed")
public interface FeedInfoRepository extends JpaRepository<FeedInfo, Long> {

}
