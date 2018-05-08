package com.skiut.authservice.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Account {
    private String userName;
    private String password;
    private boolean active;
    @Id
    @GeneratedValue
    private long id;

    public Account(){

    }

    @Override
    public String toString() {
        return "Account{" +
                "userName='" + userName + '\'' +
                ", active=" + active +
                ", id=" + id +
                '}';
    }

    public Account(String userName, String password, boolean active) {
        this.userName = userName;
        this.password = password;
        this.active = active;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
