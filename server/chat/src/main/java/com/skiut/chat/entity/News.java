package com.skiut.chat.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class News {
    @Id
    @GeneratedValue()
    private Long id;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Message> messages;
}
