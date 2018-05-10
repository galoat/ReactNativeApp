package com.oauthservice.oauth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.AuthenticationManager;
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

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Optional;
import java.util.stream.Stream;

@SpringBootApplication
@EnableResourceServer
@EnableDiscoveryClient
public class OauthApplication {

	public static void main(String[] args) {
		SpringApplication.run(OauthApplication.class, args);
	}
}

@RestController
class Principal {
	@RequestMapping("/user")
	Principal p(Principal principal){
		return  principal;
	}

}


@Configuration
@EnableAuthorizationServer
class OAuthCOnfig extends AuthorizationServerConfigurerAdapter {

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

	private final AuthenticationManager authenticationManager;

	@Autowired
	public OAuthCOnfig(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
}

@Component
class SampleAccountCli implements CommandLineRunner{

	private final AccountRepository accountRepository;

	@Autowired
	public SampleAccountCli(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		Stream.of("jlong,spring")
				.map(x ->  x.split(","))
				.forEach(tuple -> accountRepository.save(new Account( tuple[0], tuple[1], true )));
	}
}


@Service
class AccountUserDetailsService implements UserDetailsService {
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		  return accountRepository.findByUsername(username)
				  .map(account -> new User(account.getUsername(), account.getPassword(),
						  account.isActive(), account.isActive(), account.isActive(), account.isActive()
						  , AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER")))
				  .orElseThrow(()-> new UsernameNotFoundException("AIE"));
	}


	private final AccountRepository accountRepository;

	@Autowired
	public AccountUserDetailsService(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}
}

interface AccountRepository extends JpaRepository<Account, Long>{

	Optional<Account> findByUsername(String  username);
}

@Entity
class Account {
	private String username;
	private String password;
	private boolean active;
	@Id
	@GeneratedValue
	private Long id;

	@Override
	public String toString() {
		return "Account{" +
				"username='" + username + '\'' +
				", password='" + password + '\'' +
				", active=" + active +
				", id=" + id +
				'}';
	}

	public Account(){

	}

	public Account(String username, String password, boolean active) {
		this.username = username;
		this.password = password;
		this.active = active;
	}

	public Account(String username, String password, boolean active, Long id) {
		this.username = username;
		this.password = password;
		this.active = active;
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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
}