package com.oauthservice.oauth.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class Account
{

	@GeneratedValue @javax.persistence.Id private Long Id;

	private String username;
	private String password;

	private boolean active;

	public Account(String username, String password, boolean active)
	{

		this.username = username;
		this.password = password;
		this.active = active;
	}

	public Account(Long id, String username, String password, boolean active)
	{
		Id = id;
		this.username = username;
		this.password = password;
		this.active = active;
	}

	@Override public String toString()
	{
		return "Account{" + "Id=" + Id + ", username='" + username + '\'' + ", active=" + active + '}';
	}

	public Account()
	{
	}

	public Long getId()
	{
		return Id;
	}

	public void setId(Long id)
	{
		Id = id;
	}

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public boolean isActive()
	{
		return active;
	}

	public void setActive(boolean active)
	{
		this.active = active;
	}
}