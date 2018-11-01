package com.skiut.chat.repository;

import com.skiut.chat.entity.Message;
import com.skiut.chat.entity.News;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MessageRepositoryTest {

    @Autowired
    private NewsRepository repository;

    @Test
    public void saveNews() {
        int nbListElement = 10;
        News  news= new News();
        List<Message> listMessages = new ArrayList();
        news.setMessages(listMessages);
        for (int i = 0; i < nbListElement; i++) {
            Message message = new Message("test" + i);
            listMessages.add(message);
        }
        repository.save(news);
        Assert.assertFalse("The news have not been saved with an ID", news.getId() == 0);
        Long id = news.getId();
        // check result
        Optional<News> newsInDb = repository.findById(id);
        Assert.assertTrue("News in DB is empty", newsInDb.isPresent());

        Assert.assertTrue("The two array are not equals : "+news.getMessages().toString() + "\n\n "+listMessages.toString(), newsInDb.get().equals(news));
    }

    public void setRepository(NewsRepository repository) {
        this.repository = repository;
    }

    public NewsRepository getRepository() {
        return repository;
    }
}