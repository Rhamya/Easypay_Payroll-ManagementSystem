package com.hexaware.easypay.service;

import java.util.List;

import com.hexaware.easypay.entity.Designation;

public interface DesignationService {
	Designation createDesignation(Designation designation);

	Designation updateDesignation(Long id, Designation designation);

	String deleteDesignation(Long id);

	Designation getDesignationById(Long id);

	List<Designation> getAllDesignations();
}
