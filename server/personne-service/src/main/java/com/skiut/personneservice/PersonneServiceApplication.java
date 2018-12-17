package com.skiut.personneservice;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import java.util.stream.Stream;


@EnableDiscoveryClient
@SpringBootApplication
public class PersonneServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonneServiceApplication.class, args);
	}
}

///TODO delete that and send it to a test class
@Component
class SampleDataCLR implements ApplicationRunner {


	private final PersonneRepository personneRepository;
	@Autowired
	public SampleDataCLR(PersonneRepository personneRepository)
	{
		this.personneRepository = personneRepository;
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("ijojiojoijiojiojiojio");
		personneRepository.deleteAll().thenMany(Flux.just("Florian", "Anaël"))
				.map(personne -> new Personne(personne))
				.flatMap(personneRepository::save)
				.thenMany(personneRepository.findAll())
				.subscribe(name -> System.out.println(name.toString()));
	}
}
