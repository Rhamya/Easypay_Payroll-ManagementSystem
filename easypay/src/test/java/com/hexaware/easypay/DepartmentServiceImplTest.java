package com.hexaware.easypay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
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
import com.hexaware.easypay.repository.DepartmentRepository;
import com.hexaware.easypay.service.impl.DepartmentServiceImpl;

class DepartmentServiceImplTest {

	@Mock
	private DepartmentRepository departmentRepository;

	@InjectMocks
	private DepartmentServiceImpl departmentService;

	private Department department;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		department = new Department();
		department.setDeptId(1L);
		department.setDeptName("HR");
	}

	@Test
	void testCreateDepartment() {
		when(departmentRepository.save(department)).thenReturn(department);

		Department created = departmentService.createDepartment(department);

		assertNotNull(created);
		assertEquals("HR", created.getDeptName());
		verify(departmentRepository, times(1)).save(department);
	}

	@Test
	void testUpdateDepartment_Success() {
		Department updatedDept = new Department();
		updatedDept.setDeptName("Finance");

		when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
		when(departmentRepository.save(any(Department.class))).thenReturn(updatedDept);

		Department result = departmentService.updateDepartment(1L, updatedDept);

		assertEquals("Finance", result.getDeptName());
		verify(departmentRepository, times(1)).findById(1L);
		verify(departmentRepository, times(1)).save(department);
	}

	@Test
	void testUpdateDepartment_NotFound() {
		when(departmentRepository.findById(1L)).thenReturn(Optional.empty());

		RuntimeException exception = assertThrows(RuntimeException.class,
				() -> departmentService.updateDepartment(1L, department));

		assertTrue(exception.getMessage().contains("Department not found with ID: 1"));
		verify(departmentRepository, times(1)).findById(1L);
		verify(departmentRepository, never()).save(any());
	}

	@Test
	void testDeleteDepartment_Success() {
		when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
		doNothing().when(departmentRepository).delete(department);

		departmentService.deleteDepartment(1L);

		verify(departmentRepository, times(1)).findById(1L);
		verify(departmentRepository, times(1)).delete(department);
	}

	@Test
	void testDeleteDepartment_NotFound() {
		when(departmentRepository.findById(1L)).thenReturn(Optional.empty());

		RuntimeException exception = assertThrows(RuntimeException.class, () -> departmentService.deleteDepartment(1L));

		assertTrue(exception.getMessage().contains("Department not found with ID: 1"));
		verify(departmentRepository, times(1)).findById(1L);
		verify(departmentRepository, never()).delete(any());
	}

	@Test
	void testGetDepartmentById_Success() {
		when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));

		Department result = departmentService.getDepartmentById(1L);

		assertNotNull(result);
		assertEquals("HR", result.getDeptName());
		verify(departmentRepository, times(1)).findById(1L);
	}

	@Test
	void testGetDepartmentById_NotFound() {
		when(departmentRepository.findById(1L)).thenReturn(Optional.empty());

		RuntimeException exception = assertThrows(RuntimeException.class,
				() -> departmentService.getDepartmentById(1L));

		assertTrue(exception.getMessage().contains("Department not found with ID: 1"));
		verify(departmentRepository, times(1)).findById(1L);
	}

	
}
