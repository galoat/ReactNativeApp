package com.skiut.eureckaservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class EureckaServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EureckaServiceApplication.class, args);
	}
}
