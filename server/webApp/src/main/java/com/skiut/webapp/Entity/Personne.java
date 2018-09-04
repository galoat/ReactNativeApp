package com.skiut.webapp.Entity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Personne
{
	private String password;
	private String name;

	@Override
	public String toString() {
		return "Client{" +
						"password='" + password + '\'' +
						", name='" + name + '\'' +
						'}';
	}
}
