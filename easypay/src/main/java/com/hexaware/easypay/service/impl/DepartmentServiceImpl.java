package com.hexaware.easypay.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.Department;
import com.hexaware.easypay.repository.DepartmentRepository;
import com.hexaware.easypay.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {

	private static final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

	private final DepartmentRepository departmentRepository;

	public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
		this.departmentRepository = departmentRepository;
	}

	@Override
	public Department createDepartment(Department department) {
		log.info("Creating department: {}", department.getDeptName());
		try {
			Department saved = departmentRepository.save(department);
			log.info("Department created successfully with ID: {}", saved.getDeptId());
			return saved;
		} catch (Exception e) {
			log.error("Error creating department: {}", department.getDeptName(), e);
			throw e;
		}
	}

	@Override
	public Department updateDepartment(Long id, Department department) {
		log.info("Updating department with ID: {}", id);
		Department existing = departmentRepository.findById(id).orElseThrow(() -> {
			log.error("Department not found with ID: {}", id);
			return new RuntimeException("Department not found with ID: " + id);
		});
		existing.setDeptName(department.getDeptName());
		try {
			Department updated = departmentRepository.save(existing);
			log.info("Department updated successfully with ID: {}", updated.getDeptId());
			return updated;
		} catch (Exception e) {
			log.error("Error updating department with ID: {}", id, e);
			throw e;
		}
	}

	@Override
	public void deleteDepartment(Long id) {
		log.info("Deleting department with ID: {}", id);
		Department existing = departmentRepository.findById(id).orElseThrow(() -> {
			log.error("Department not found with ID: {}", id);
			return new RuntimeException("Department not found with ID: " + id);
		});
		try {
			departmentRepository.delete(existing);
			log.info("Department deleted successfully with ID: {}", id);
		} catch (Exception e) {
			log.error("Error deleting department with ID: {}", id, e);
			throw e;
		}
	}

	@Override
	public Department getDepartmentById(Long id) {
		log.info("Fetching department with ID: {}", id);
		return departmentRepository.findById(id).orElseThrow(() -> {
			log.error("Department not found with ID: {}", id);
			return new RuntimeException("Department not found with ID: " + id);
		});
	}

	@Override
	public List<Department> getAllDepartments() {
		log.info("Fetching all departments");
		List<Department> list = departmentRepository.findAll();
		log.info("Total departments fetched: {}", list.size());
		return list;
	}
}
