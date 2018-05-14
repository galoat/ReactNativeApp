package com.oauthservice.oauth.services;

import com.oauthservice.oauth.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountUserDetailsService implements UserDetailsService
{
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		return this.repo.findByUsername(username).
						map(account ->new User(
										account.getUsername(),
										account.getPassword(),
										account.isActive(),account.isActive(),account.isActive(),account.isActive(),
										AuthorityUtils.createAuthorityList("ROLE_ADMIN","ROLE_USER")
						)  ).orElseThrow(()-> new UsernameNotFoundException("no user add "+username ));
	}


	private AccountRepository repo;
	@Autowired
	public AccountUserDetailsService(AccountRepository repo) {
		this.repo = repo;
	}
}
