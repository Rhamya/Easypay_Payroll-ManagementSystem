package com.hexaware.easypay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.hexaware.easypay.entity.Department;
import com.hexaware.easypay.entity.Designation;
import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.repository.DepartmentRepository;
import com.hexaware.easypay.repository.DesignationRepository;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.service.impl.EmployeeServiceImpl;

class EmployeeServiceImplTest {

	@Mock
	private EmployeeRepository employeeRepository;

	@Mock
	private DepartmentRepository departmentRepository;

	@Mock
	private DesignationRepository designationRepository;

	@InjectMocks
	private EmployeeServiceImpl employeeService;

	private Employee emp;
	private Department dept;
	private Designation desig;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		dept = new Department();
		dept.setDeptId(1L);
		dept.setDeptName("IT");

		desig = new Designation();
		desig.setDesigId(1L);
		desig.setTitle("Developer");

		emp = new Employee();
		emp.setEmpId(100L);
		emp.setFirstName("John");
		emp.setLastName("Doe");
		emp.setEmail("john@example.com");
		emp.setDepartment(dept);
		emp.setDesignation(desig);
	}

	@Test
	void testCreateEmployee() {
		when(employeeRepository.save(emp)).thenReturn(emp);

		Employee created = employeeService.createEmployee(emp);

		assertNotNull(created);
		assertEquals("John", created.getFirstName());
		verify(employeeRepository, times(1)).save(emp);
	}

	@Test
	void testGetEmployeeById_Found() {
		when(employeeRepository.findById(100L)).thenReturn(Optional.of(emp));

		Employee found = employeeService.getEmployeeById(100L);

		assertNotNull(found);
		assertEquals("John", found.getFirstName());
	}

	@Test
	void testGetEmployeeById_NotFound() {
		when(employeeRepository.findById(101L)).thenReturn(Optional.empty());

		assertThrows(RuntimeException.class, () -> {
			employeeService.getEmployeeById(101L);
		});
	}

	@Test
	void testGetAllEmployees() {
		when(employeeRepository.findAll()).thenReturn(Arrays.asList(emp));

		List<Employee> list = employeeService.getAllEmployees();

		assertEquals(1, list.size());
		verify(employeeRepository, times(1)).findAll();
	}

	@Test
	void testUpdateEmployee() {
		Employee updatedData = new Employee();
		updatedData.setFirstName("Jane");
		updatedData.setDepartment(dept);
		updatedData.setDesignation(desig);

		when(employeeRepository.findById(100L)).thenReturn(Optional.of(emp));
		when(departmentRepository.findById(1L)).thenReturn(Optional.of(dept));
		when(designationRepository.findById(1L)).thenReturn(Optional.of(desig));
		when(employeeRepository.save(any(Employee.class))).thenReturn(emp);

		Employee updated = employeeService.updateEmployee(100L, updatedData);

		assertEquals("Jane", updated.getFirstName());
		assertEquals("IT", updated.getDepartment().getDeptName());
		assertEquals("Developer", updated.getDesignation().getTitle());
		verify(employeeRepository, times(1)).save(emp);
	}

	@Test
	void testDeleteEmployee() {
		when(employeeRepository.findById(100L)).thenReturn(Optional.of(emp));
		doNothing().when(employeeRepository).delete(emp);

		employeeService.deleteEmployee(100L);

		verify(employeeRepository, times(1)).delete(emp);
	}
}
