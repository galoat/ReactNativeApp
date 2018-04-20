package com.skiut.personneservice;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.stereotype.Component;

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
class SampleDataCLR implements CommandLineRunner {
	private final PersonneRepository personneRepository;

	public SampleDataCLR(PersonneRepository personneRepository)
	{
		this.personneRepository = personneRepository;
	}

	@Override
	public void run(String... args) throws Exception
	{
		Stream.of("Florian", "Anaël", "Solene", "Antho", "Fanny", "Marjo")
						.forEach(name -> personneRepository.save(new Personne(name)));
		personneRepository.findAll().forEach(System.out::println);

	}
}
