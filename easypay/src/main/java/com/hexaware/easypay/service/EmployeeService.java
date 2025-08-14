package com.hexaware.easypay.service;

import java.util.List;

import com.hexaware.easypay.entity.Employee;

public interface EmployeeService {
	Employee createEmployee(Employee employee);

	Employee updateEmployee(Long id, Employee employee);

	void deleteEmployee(Long id);

	Employee getEmployeeById(Long id);

	List<Employee> getAllEmployees();
}
