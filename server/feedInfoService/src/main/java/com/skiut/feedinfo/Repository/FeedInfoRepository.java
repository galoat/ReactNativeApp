package com.skiut.feedinfo.Repository;

import com.skiut.feedinfo.Entity.FeedInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.List;

@RepositoryRestResource( path = "test")
public interface FeedInfoRepository extends JpaRepository<FeedInfo, Long> {
    Collection<FeedInfo> findById(@Param("id") String name);

}
