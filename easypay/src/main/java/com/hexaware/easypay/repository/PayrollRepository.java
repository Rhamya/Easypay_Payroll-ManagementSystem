package com.hexaware.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.easypay.entity.Payroll;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
//	List<Payroll> findByEmployeeId(Long employeeId);
}
