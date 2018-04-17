package com.skiut.personneservice;

import com.skiut.personneservice.Entity.Personne;
import com.skiut.personneservice.Repository.PersonneRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

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
		Stream.of("Florian", "Anael", "Solene", "Antho", "Fanny", "Marjo")
						.forEach(name -> personneRepository.save(new Personne(name)));
		personneRepository.findAll().forEach(System.out::println);

	}
}
