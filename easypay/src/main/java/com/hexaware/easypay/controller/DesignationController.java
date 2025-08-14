package com.hexaware.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.easypay.dto.DesignationDTO;
import com.hexaware.easypay.entity.Designation;
import com.hexaware.easypay.service.DesignationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/desig")
public class DesignationController {

	@Autowired
	private DesignationService designationService;

	@PostMapping("/create")
	public Designation create(@Valid @RequestBody DesignationDTO dto) {
		Designation designation = mapDtoToEntity(dto);
		return designationService.createDesignation(designation);
	}

	@GetMapping("/getById/{id}")
	public Designation getById(@PathVariable Long id) {
		return designationService.getDesignationById(id);
	}

	@GetMapping("/getAll")
	public List<Designation> getAll() {
		return designationService.getAllDesignations();
	}

	@PutMapping("/update/{id}")
	public Designation update(@PathVariable Long id, @Valid @RequestBody DesignationDTO dto) {
		Designation designation = mapDtoToEntity(dto);
		return designationService.updateDesignation(id, designation);
	}

	@DeleteMapping("/deleteById/{id}")
	public String deleteById(@PathVariable Long id) {
		return designationService.deleteDesignation(id);
	}

	private Designation mapDtoToEntity(DesignationDTO dto) {
	    Designation designation = new Designation();
	    designation.setDesigId(dto.getId());  // map DTO id → entity desigId
	    designation.setTitle(dto.getTitle());
	    designation.setDescription(dto.getDescription());
	    return designation;
	}

}
