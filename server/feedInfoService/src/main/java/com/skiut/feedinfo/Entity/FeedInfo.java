package com.skiut.feedinfo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedInfo {
    @Id
    @GeneratedValue
    private Long id;
    private String feed;

    public FeedInfo(String feed)
    {
        this.feed = feed;
    }
}
