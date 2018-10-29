package com.skiut.personneservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * The type Personne.
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Personne
{
	/**
	 * The Id.
	 */
	@Id
	@GeneratedValue
	private Long id;
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
