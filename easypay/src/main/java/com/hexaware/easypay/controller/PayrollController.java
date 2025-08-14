package com.hexaware.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.easypay.dto.PayrollDTO;
import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.entity.Payroll;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.service.PayrollService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payrolls")
public class PayrollController {

	@Autowired
	private PayrollService payrollService;

	@PostMapping("/create")
	public Payroll create(@Valid @RequestBody PayrollDTO payrollDto) {
		Payroll payroll = mapDtoToEntity(payrollDto);
		return payrollService.createPayroll(payroll);
	}

	@GetMapping("/getById/{id}")
	public Payroll getById(@PathVariable long id) {
		return payrollService.getPayrollById(id);
	}

	@GetMapping("/getAll")
	public List<Payroll> getAll() {
		return payrollService.getAllPayrolls();
	}

	@DeleteMapping("/deleteById/{id}")
	public String deleteById(@PathVariable long id) {
		payrollService.deletePayroll(id);
		return "Payroll deleted successfully";
	}

	@Autowired
	private EmployeeRepository employeeRepository;

	/** Converts PayrollDTO to Payroll entity */
	private Payroll mapDtoToEntity(PayrollDTO dto) {
	    Payroll payroll = new Payroll();
	    payroll.setPayrollId(dto.getPayrollId());

	    // Fetch Employee using empId
	    Employee employee = employeeRepository.findById(dto.getEmpId())
	            .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + dto.getEmpId()));

	    payroll.setEmployee(employee);
	    payroll.setMonth(dto.getMonth());
	    payroll.setYear(dto.getYear());
	    payroll.setGrossPay(dto.getGrossPay());
	    payroll.setDeductions(dto.getDeductions());
	    payroll.setNetPay(dto.getNetPay());
	    payroll.setStatus(dto.getStatus());
	    return payroll;
	}

}
