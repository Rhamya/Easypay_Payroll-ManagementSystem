package com.hexaware.easypay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.easypay.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
//	boolean existsByName(String name);
}
