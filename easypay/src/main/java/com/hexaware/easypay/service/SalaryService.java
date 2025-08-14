package com.hexaware.easypay.service;

import java.util.List;

import com.hexaware.easypay.entity.Salary;

public interface SalaryService {
	Salary create(Salary salary);

	Salary update(Long id, Salary salary);

	Salary getById(Long id);

	List<Salary> getAll();

	String deleteById(Long id);
}
