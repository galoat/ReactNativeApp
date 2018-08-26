package com.skiut.feedinfo;

import com.skiut.feedinfo.Entity.FeedInfo;

import com.skiut.feedinfo.Repository.FeedInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Component;

import java.util.Collection;



@EnableDiscoveryClient
@SpringBootApplication
public class FeedinfoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeedinfoServiceApplication.class, args);
	}
}


///TODO delete that and send it to a test class
@Component
class SampleDataCLR implements CommandLineRunner {

	@Autowired
	private final FeedInfoRepository feedInfoRepository;

	public SampleDataCLR(FeedInfoRepository feedInfoRepository)
	{
		this.feedInfoRepository = feedInfoRepository;
	}

	@Override
	public void run(String... args) throws Exception
	{
	/*	Stream.of("fre,fkeor,f", "feferfre", "ferfref", "ferfrfe", "frefre")
				.forEach(name -> feedInfoRepository.save(new FeedInfo(name)));*/
		feedInfoRepository.findAll().forEach(System.out::println);

	}
}


