package com.skiut.chat.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Objects;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue
    private Long id;
    private String text;
    @ManyToOne
    private User user;

    public Message(String text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(getId(), message.getId()) &&
                Objects.equals(getText(), message.getText()) &&
                Objects.equals(getUser(), message.getUser());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getText(), getUser());
    }
}
