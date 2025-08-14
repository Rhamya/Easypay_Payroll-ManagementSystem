package com.hexaware.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.easypay.entity.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
//	List<Salary> findByEmployeeId(Long employeeId);
}
