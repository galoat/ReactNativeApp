package com.skiut.feedinfo.Repository;

import com.skiut.feedinfo.Entity.FeedInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;


/**
 * The interface Feed info repository.
 */
@RepositoryRestResource(collectionResourceRel = "feed" , path = "feed")
public interface FeedInfoRepository extends JpaRepository<FeedInfo, Long> {
    /**
     * Find by id optional.
     *
     * @param id the id
     * @return the optional
     */
    Optional<FeedInfo> findById(Long id);
}
