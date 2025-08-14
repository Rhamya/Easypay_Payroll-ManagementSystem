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
import com.hexaware.easypay.entity.Payroll;
import com.hexaware.easypay.exceptions.EmployeeNotFoundException;
import com.hexaware.easypay.exceptions.PayrollNotFoundException;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.repository.PayrollRepository;
import com.hexaware.easypay.service.impl.PayrollServiceImpl;

class PayrollServiceImplTest {

	@Mock
	private PayrollRepository payrollRepository;

	@Mock
	private EmployeeRepository employeeRepository;

	@InjectMocks
	private PayrollServiceImpl payrollService;

	private Employee employee;
	private Payroll payroll1;
	private Payroll payroll2;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		employee = new Employee();
		employee.setEmpId(101L);
		employee.setFirstName("Alice");

		payroll1 = new Payroll();
		payroll1.setPayrollId(1L);
		payroll1.setGrossPay(50000.0);
		payroll1.setEmployee(employee);

		payroll2 = new Payroll();
		payroll2.setPayrollId(2L);
		payroll2.setGrossPay(60000.0);
	}

	@Test
	void testCreatePayroll_WithExistingEmployee() {
		when(employeeRepository.findById(101L)).thenReturn(Optional.of(employee));
		when(payrollRepository.save(payroll1)).thenReturn(payroll1);

		Payroll created = payrollService.createPayroll(payroll1);

		assertNotNull(created);
		assertEquals(50000.0, created.getGrossPay());
		assertEquals(employee.getEmpId(), created.getEmployee().getEmpId());
		verify(payrollRepository, times(1)).save(payroll1);
	}

	@Test
	void testCreatePayroll_EmployeeNotFound() {
		payroll1.getEmployee().setEmpId(999L);
		when(employeeRepository.findById(999L)).thenReturn(Optional.empty());

		assertThrows(EmployeeNotFoundException.class, () -> {
			payrollService.createPayroll(payroll1);
		});
	}

	@Test
	void testGetPayrollById_Found() {
		when(payrollRepository.findById(1L)).thenReturn(Optional.of(payroll1));

		Payroll found = payrollService.getPayrollById(1L);

		assertNotNull(found);
		assertEquals(50000.0, found.getGrossPay());
	}

	@Test
	void testGetPayrollById_NotFound() {
		when(payrollRepository.findById(3L)).thenReturn(Optional.empty());

		assertThrows(PayrollNotFoundException.class, () -> {
			payrollService.getPayrollById(3L);
		});
	}

	@Test
	void testGetAllPayrolls() {
		when(payrollRepository.findAll()).thenReturn(Arrays.asList(payroll1, payroll2));

		List<Payroll> list = payrollService.getAllPayrolls();

		assertEquals(2, list.size());
		verify(payrollRepository, times(1)).findAll();
	}

	@Test
	void testUpdatePayroll_WithEmployee() {
		Payroll updatedData = new Payroll();
		updatedData.setGrossPay(70000.0);
		updatedData.setEmployee(employee);

		when(payrollRepository.findById(1L)).thenReturn(Optional.of(payroll1));
		when(employeeRepository.findById(101L)).thenReturn(Optional.of(employee));
		when(payrollRepository.save(any(Payroll.class))).thenReturn(payroll1);

		Payroll updated = payrollService.updatePayroll(1L, updatedData);

		assertEquals(70000.0, updated.getGrossPay());
		assertEquals(employee.getEmpId(), updated.getEmployee().getEmpId());
		verify(payrollRepository, times(1)).save(payroll1);
	}

	@Test
	void testDeletePayroll() {
		doNothing().when(payrollRepository).deleteById(1L);

		String message = payrollService.deletePayroll(1L);

		assertEquals("Payroll deleted successfully with ID: 1", message);
		verify(payrollRepository, times(1)).deleteById(1L);
	}
}
