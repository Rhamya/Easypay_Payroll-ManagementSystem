package com.hexaware.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.easypay.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//	List<Employee> findByDepartmentId(Long departmentId);
//
//	List<Employee> findByDesignationId(Long designationId);
}
