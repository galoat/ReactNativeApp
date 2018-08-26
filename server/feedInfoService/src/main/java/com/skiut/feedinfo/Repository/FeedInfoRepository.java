package com.skiut.feedinfo.Repository;

import com.skiut.feedinfo.Entity.FeedInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;


@RepositoryRestResource(collectionResourceRel = "feed" , path = "feed")
public interface FeedInfoRepository extends JpaRepository<FeedInfo, Long> {
    Optional<FeedInfo> findById(Long id);
}
