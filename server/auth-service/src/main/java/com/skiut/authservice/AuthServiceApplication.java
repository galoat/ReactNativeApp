package com.skiut.authservice;

import com.skiut.authservice.entity.Account;
import com.skiut.authservice.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.stream.Stream;

@SpringBootApplication
@EnableResourceServer
@EnableDiscoveryClient
public class AuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
	}
}

@EnableAuthorizationServer
@Configuration
class OAuthConfig extends AuthorizationServerConfigurerAdapter {


	private  AuthenticationManager authenticationManager;

	@Autowired
	public OAuthConfig(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {

		clients.inMemory()
				.withClient("html5")
				.secret("secret")
				.scopes("openid")
				.authorizedGrantTypes("password");
	}

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.authenticationManager(this.authenticationManager);
	}

	@Configuration
	public static class AuthenticationMananagerProvider extends WebSecurityConfigurerAdapter {

		@Bean
		@Override
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}

	}

}

@RestController
class PrincipalRestController{

	@RequestMapping("/user")
	Principal principal(Principal principal){
		return principal;
	}
}

@Component
class simplAccountCLR implements CommandLineRunner {

	@Autowired
	private final AccountRepository accountRepository;

	public simplAccountCLR(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		Stream.of("Florian,admin", "Anael,user", "bidule,user", "test,user")
				.map(x ->x.split(","))
				.forEach(tuple -> accountRepository.save(new Account(tuple[0], tuple[1], true)));


	}

	public AccountRepository getAccountRepository() {
		return accountRepository;
	}
}


@Service
 class AccountUserDetailsService implements UserDetailsService {

	@Autowired
	private AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepository.findByUserName(username)
				.map(account -> new User(account.getUserName(), account.getPassword()
						, account.isActive()
						, account.isActive()
						, account.isActive()
						, account.isActive()
						, AuthorityUtils.createAuthorityList("ROLE_USER")))
				.orElseThrow(()->new UsernameNotFoundException("OOPS"));
	}

	public AccountRepository getAccountRepository() {
		return accountRepository;
	}


	public void setAccountRepository(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}
}

