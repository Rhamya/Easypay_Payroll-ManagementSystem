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

import com.hexaware.easypay.entity.Designation;
import com.hexaware.easypay.exceptions.DesignationNotFoundException;
import com.hexaware.easypay.repository.DesignationRepository;
import com.hexaware.easypay.service.impl.DesignationServiceImpl;

class DesignationServiceImplTest {

	@Mock
	private DesignationRepository designationRepository;

	@InjectMocks
	private DesignationServiceImpl designationService;

	private Designation designation1;
	private Designation designation2;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		designation1 = new Designation();
		designation1.setDesigId(1L);
		designation1.setTitle("Manager");
		designation1.setDescription("Manages team");

		designation2 = new Designation();
		designation2.setDesigId(2L);
		designation2.setTitle("Developer");
		designation2.setDescription("Writes code");
	}

	@Test
	void testCreateDesignation() {
		when(designationRepository.save(designation1)).thenReturn(designation1);

		Designation created = designationService.createDesignation(designation1);

		assertNotNull(created);
		assertEquals("Manager", created.getTitle());
		verify(designationRepository, times(1)).save(designation1);
	}

	@Test
	void testGetDesignationById_Found() {
		when(designationRepository.findById(1L)).thenReturn(Optional.of(designation1));

		Designation found = designationService.getDesignationById(1L);

		assertNotNull(found);
		assertEquals("Manager", found.getTitle());
	}

	@Test
	void testGetDesignationById_NotFound() {
		when(designationRepository.findById(3L)).thenReturn(Optional.empty());

		assertThrows(DesignationNotFoundException.class, () -> {
			designationService.getDesignationById(3L);
		});
	}

	@Test
	void testGetAllDesignations() {
		when(designationRepository.findAll()).thenReturn(Arrays.asList(designation1, designation2));

		List<Designation> list = designationService.getAllDesignations();

		assertEquals(2, list.size());
		verify(designationRepository, times(1)).findAll();
	}

	@Test
	void testUpdateDesignation() {
		when(designationRepository.findById(1L)).thenReturn(Optional.of(designation1));
		when(designationRepository.save(any(Designation.class))).thenReturn(designation1);

		Designation updatedData = new Designation();
		updatedData.setTitle("Senior Manager");
		updatedData.setDescription("Manages bigger team");

		Designation updated = designationService.updateDesignation(1L, updatedData);

		assertEquals("Senior Manager", updated.getTitle());
		assertEquals("Manages bigger team", updated.getDescription());
		verify(designationRepository, times(1)).save(designation1);
	}

	@Test
	void testDeleteDesignation() {
		when(designationRepository.findById(1L)).thenReturn(Optional.of(designation1));
		doNothing().when(designationRepository).delete(designation1);

		String message = designationService.deleteDesignation(1L);

		assertEquals("Designation deleted successfully with ID: 1", message);
		verify(designationRepository, times(1)).delete(designation1);
	}
}
