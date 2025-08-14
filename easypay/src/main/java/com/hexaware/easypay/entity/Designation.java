package com.hexaware.easypay.entity;

//import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "designations")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class Designation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long desigId;

	@Column(nullable = false, unique = true)
	private String title;

	private String description;

	@JsonIgnore
	@OneToMany(mappedBy = "designation", cascade = CascadeType.ALL)
	private List<Employee> employees;

	public Long getDesigId() {
		return desigId;
	}

	public void setDesigId(Long desigId) {
		this.desigId = desigId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}
	
	
	
}
