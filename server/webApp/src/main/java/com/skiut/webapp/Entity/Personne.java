package com.skiut.webapp.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Personne.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Personne
{
	/**
	 * The Password.
	 */
	private String password;
	/**
	 * The Name.
	 */
	private String name;

	/**
	 * To string string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "Client{" +
						"password='" + password + '\'' +
						", name='" + name + '\'' +
						'}';
	}
}
