package com.hexaware.easypay.service;

import java.util.List;

import com.hexaware.easypay.entity.Payroll;

public interface PayrollService {
	Payroll createPayroll(Payroll payroll);

	Payroll updatePayroll(Long id, Payroll payroll);

	String deletePayroll(Long id);

	Payroll getPayrollById(Long id);

	List<Payroll> getAllPayrolls();
}
