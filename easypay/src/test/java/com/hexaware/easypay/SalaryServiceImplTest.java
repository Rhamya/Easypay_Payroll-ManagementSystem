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

import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.entity.Salary;
import com.hexaware.easypay.exceptions.EmployeeNotFoundException;
import com.hexaware.easypay.exceptions.SalaryNotFoundException;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.repository.SalaryRepository;
import com.hexaware.easypay.service.impl.SalaryServiceImpl;

class SalaryServiceImplTest {

	@Mock
	private SalaryRepository salaryRepository;

	@Mock
	private EmployeeRepository employeeRepository;

	@InjectMocks
	private SalaryServiceImpl salaryService;

	private Employee employee;
	private Salary salary1;
	private Salary salary2;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		employee = new Employee();
		employee.setEmpId(100L);
		employee.setFirstName("John");

		salary1 = new Salary();
		salary1.setSalaryId(1L);
		salary1.setBasic(50000.0);
		salary1.setEmployee(employee);

		salary2 = new Salary();
		salary2.setSalaryId(2L);
		salary2.setBasic(60000.0);
	}

	@Test
	void testCreateSalary_WithExistingEmployee() {
		when(employeeRepository.findById(100L)).thenReturn(Optional.of(employee));
		when(salaryRepository.save(salary1)).thenReturn(salary1);

		Salary created = salaryService.create(salary1);

		assertNotNull(created);
		assertEquals(50000.0, created.getBasic());
		assertEquals(employee.getEmpId(), created.getEmployee().getEmpId());
		verify(salaryRepository, times(1)).save(salary1);
	}

	@Test
	void testCreateSalary_EmployeeNotFound() {
		salary1.getEmployee().setEmpId(999L);
		when(employeeRepository.findById(999L)).thenReturn(Optional.empty());

		assertThrows(EmployeeNotFoundException.class, () -> {
			salaryService.create(salary1);
		});
	}

	@Test
	void testGetById_Found() {
		when(salaryRepository.findById(1L)).thenReturn(Optional.of(salary1));

		Salary found = salaryService.getById(1L);

		assertNotNull(found);
		assertEquals(50000.0, found.getBasic());
	}

	@Test
	void testGetById_NotFound() {
		when(salaryRepository.findById(3L)).thenReturn(Optional.empty());

		assertThrows(SalaryNotFoundException.class, () -> {
			salaryService.getById(3L);
		});
	}

	@Test
	void testGetAll() {
		when(salaryRepository.findAll()).thenReturn(Arrays.asList(salary1, salary2));

		List<Salary> list = salaryService.getAll();

		assertEquals(2, list.size());
		verify(salaryRepository, times(1)).findAll();
	}

	@Test
	void testUpdateSalary_WithEmployee() {
		Salary updatedData = new Salary();
		updatedData.setBasic(70000.0);
		updatedData.setEmployee(employee);

		when(salaryRepository.findById(1L)).thenReturn(Optional.of(salary1));
		when(employeeRepository.findById(100L)).thenReturn(Optional.of(employee));
		when(salaryRepository.save(any(Salary.class))).thenReturn(salary1);

		Salary updated = salaryService.update(1L, updatedData);

		assertEquals(70000.0, updated.getBasic());
		assertEquals(employee.getEmpId(), updated.getEmployee().getEmpId());
		verify(salaryRepository, times(1)).save(salary1);
	}

	@Test
	void testDeleteSalary() {
		when(salaryRepository.findById(1L)).thenReturn(Optional.of(salary1));
		doNothing().when(salaryRepository).delete(salary1);

		String message = salaryService.deleteById(1L);

		assertEquals("Salary record deleted successfully with ID: 1", message);
		verify(salaryRepository, times(1)).delete(salary1);
	}
}
