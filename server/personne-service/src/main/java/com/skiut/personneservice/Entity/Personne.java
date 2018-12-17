package com.skiut.personneservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The type Personne.
 */
@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Personne
{
	/**
	 * The Id.
	 */
	@Id
	private String id;
	/**
	 * The Name.
	 */
	private String name;

	/**
	 * Instantiates a new Personne.
	 *
	 * @param name the name
	 */
	public Personne(String name)
	{
		this.name = name;
	}
}
