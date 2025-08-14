package com.hexaware.easypay.service;

import java.util.List;

import com.hexaware.easypay.entity.Department;

public interface DepartmentService {
	Department createDepartment(Department department);

	Department updateDepartment(Long id, Department department);

	void deleteDepartment(Long id);

	Department getDepartmentById(Long id);

	List<Department> getAllDepartments();
}
