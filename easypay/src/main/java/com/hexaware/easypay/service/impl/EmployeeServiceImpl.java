package com.hexaware.easypay.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.Department;
import com.hexaware.easypay.entity.Designation;
import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.repository.DepartmentRepository;
import com.hexaware.easypay.repository.DesignationRepository;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	private static final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

	private final EmployeeRepository employeeRepository;
	private final DepartmentRepository departmentRepository;
	private final DesignationRepository designationRepository;

	public EmployeeServiceImpl(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository,
			DesignationRepository designationRepository) {
		this.employeeRepository = employeeRepository;
		this.departmentRepository = departmentRepository;
		this.designationRepository = designationRepository;
	}

	@Override
	public Employee createEmployee(Employee employee) {
		log.info("Creating employee: {} {}", employee.getFirstName(), employee.getLastName());
		try {
			Employee saved = employeeRepository.save(employee);
			log.info("Employee created successfully with ID: {}", saved.getEmpId());
			return saved;
		} catch (Exception e) {
			log.error("Error creating employee: {}", employee.getFirstName(), e);
			throw e;
		}
	}

	@Override
	public Employee updateEmployee(Long id, Employee employee) {
		log.info("Updating employee with ID: {}", id);
		Employee existing = employeeRepository.findById(id).orElseThrow(() -> {
			log.error("Employee not found with ID: {}", id);
			return new RuntimeException("Employee not found with ID: " + id);
		});

		existing.setFirstName(employee.getFirstName());
		existing.setLastName(employee.getLastName());
		existing.setEmail(employee.getEmail());
		existing.setPhone(employee.getPhone());
		existing.setDob(employee.getDob());
		existing.setDateOfJoining(employee.getDateOfJoining());

		try {
			if (employee.getDepartment() != null) {
				Long deptId = employee.getDepartment().getDeptId();
				Department dept = departmentRepository.findById(deptId).orElseThrow(() -> {
					log.error("Department not found with ID: {}", deptId);
					return new RuntimeException("Department not found with ID: " + deptId);
				});
				existing.setDepartment(dept);
				log.info("Updated department for employee {} to {}", id, dept.getDeptName());
			}

			if (employee.getDesignation() != null) {
				Long desigId = employee.getDesignation().getDesigId();
				Designation desig = designationRepository.findById(desigId).orElseThrow(() -> {
					log.error("Designation not found with ID: {}", desigId);
					return new RuntimeException("Designation not found with ID: " + desigId);
				});
				existing.setDesignation(desig);
				log.info("Updated designation for employee {} to {}", id, desig.getTitle());
			}

			Employee updated = employeeRepository.save(existing);
			log.info("Employee updated successfully: {}", updated.getEmpId());
			return updated;
		} catch (Exception e) {
			log.error("Error updating employee with ID: {}", id, e);
			throw e;
		}
	}

	@Override
	public void deleteEmployee(Long id) {
		log.info("Deleting employee with ID: {}", id);
		Employee existing = employeeRepository.findById(id).orElseThrow(() -> {
			log.error("Employee not found with ID: {}", id);
			return new RuntimeException("Employee not found with ID: " + id);
		});
		try {
			employeeRepository.delete(existing);
			log.info("Employee deleted successfully with ID: {}", id);
		} catch (Exception e) {
			log.error("Error deleting employee with ID: {}", id, e);
			throw e;
		}
	}

	@Override
	public Employee getEmployeeById(Long id) {
		log.info("Fetching employee with ID: {}", id);
		Employee emp = employeeRepository.findById(id).orElseThrow(() -> {
			log.error("Employee not found with ID: {}", id);
			return new RuntimeException("Employee not found with ID: " + id);
		});
		log.info("Employee found: {} {}", emp.getFirstName(), emp.getLastName());
		return emp;
	}

	@Override
	public List<Employee> getAllEmployees() {
		log.info("Fetching all employees");
		List<Employee> list = employeeRepository.findAll();
		log.info("Total list of employees : {}", list.size());
		return list;
	}
}
