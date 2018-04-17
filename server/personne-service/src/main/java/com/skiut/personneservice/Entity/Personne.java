package com.skiut.personneservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Personne
{
	@Id
	@GeneratedValue
	private Long id;
	private String name;

	public Personne(String name)
	{
		this.name = name;
	}
}
