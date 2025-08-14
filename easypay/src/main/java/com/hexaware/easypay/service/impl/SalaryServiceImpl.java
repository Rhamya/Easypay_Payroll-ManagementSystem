package com.hexaware.easypay.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.entity.Salary;
import com.hexaware.easypay.exceptions.EmployeeNotFoundException;
import com.hexaware.easypay.exceptions.SalaryNotFoundException;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.repository.SalaryRepository;
import com.hexaware.easypay.service.SalaryService;

@Service
public class SalaryServiceImpl implements SalaryService {

	private static final Logger log = LoggerFactory.getLogger(SalaryServiceImpl.class);

	@Autowired
	private SalaryRepository salaryRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public Salary create(Salary salary) {
		log.info("Creating salary for employee ID: {}",
				salary.getEmployee() != null ? salary.getEmployee().getEmpId() : "null");
		try {
			if (salary.getEmployee() != null && salary.getEmployee().getEmpId() != null) {
				Employee emp = employeeRepository.findById(salary.getEmployee().getEmpId()).orElseThrow(() -> {
					log.error("Employee not found with ID: {}", salary.getEmployee().getEmpId());
					return new EmployeeNotFoundException(
							"Employee not found with ID: " + salary.getEmployee().getEmpId());
				});
				salary.setEmployee(emp);
			}
			Salary saved = salaryRepository.save(salary);
			log.info("Salary created successfully with ID: {}", saved.getSalaryId());
			return saved;
		} catch (Exception e) {
			log.error("Error creating salary for employee", e);
			throw e;
		}
	}

	@Override
	public Salary getById(Long id) {
		log.info("Fetching salary with ID: {}", id);
		return salaryRepository.findById(id).orElseThrow(() -> {
			log.error("Salary not found with ID: {}", id);
			return new SalaryNotFoundException("Salary not found with ID: " + id);
		});
	}

	@Override
	public List<Salary> getAll() {
		log.info("Fetching all salaries");
		List<Salary> list = salaryRepository.findAll();
		log.info("Total salaries fetched: {}", list.size());
		return list;
	}

	@Override
	public Salary update(Long id, Salary salary) {
		log.info("Updating salary with ID: {}", id);
		Salary existing = getById(id);

		existing.setBasic(salary.getBasic());
		existing.setHra(salary.getHra());
		existing.setBonus(salary.getBonus());
		existing.setPf(salary.getPf());
		existing.setTax(salary.getTax());
		existing.setOtherDeductions(salary.getOtherDeductions());

		if (salary.getEmployee() != null && salary.getEmployee().getEmpId() != null) {
			Employee emp = employeeRepository.findById(salary.getEmployee().getEmpId()).orElseThrow(() -> {
				log.error("Employee not found with ID: {}", salary.getEmployee().getEmpId());
				return new EmployeeNotFoundException("Employee not found with ID: " + salary.getEmployee().getEmpId());
			});
			existing.setEmployee(emp);
		}

		try {
			Salary updated = salaryRepository.save(existing);
			log.info("Salary updated successfully with ID: {}", updated.getSalaryId());
			return updated;
		} catch (Exception e) {
			log.error("Error updating salary with ID: {}", id, e);
			throw e;
		}
	}

	@Override
	public String deleteById(Long id) {
		log.info("Deleting salary with ID: {}", id);
		Salary existing = getById(id);
		try {
			salaryRepository.delete(existing);
			log.info("Salary deleted successfully with ID: {}", id);
			return "Salary record deleted successfully with ID: " + id;
		} catch (Exception e) {
			log.error("Error deleting salary with ID: {}", id, e);
			throw e;
		}
	}
}
