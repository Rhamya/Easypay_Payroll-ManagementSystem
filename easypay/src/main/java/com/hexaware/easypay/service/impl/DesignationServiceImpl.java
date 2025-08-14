package com.hexaware.easypay.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.Designation;
import com.hexaware.easypay.exceptions.DesignationNotFoundException;
import com.hexaware.easypay.repository.DesignationRepository;
import com.hexaware.easypay.service.DesignationService;

@Service
public class DesignationServiceImpl implements DesignationService {

	private static final Logger log = LoggerFactory.getLogger(DesignationServiceImpl.class);

	private final DesignationRepository designationRepository;

	public DesignationServiceImpl(DesignationRepository designationRepository) {
		this.designationRepository = designationRepository;
	}

	@Override
	public Designation createDesignation(Designation designation) {
		log.info("Creating designation: {}", designation.getTitle());
		try {
			Designation saved = designationRepository.save(designation);
			log.info("Designation created successfully with ID: {}", saved.getDesigId());
			return saved;
		} catch (Exception e) {
			log.error("Error creating designation: {}", designation.getTitle(), e);
			throw e;
		}
	}

	@Override
	public Designation getDesignationById(Long id) {
		log.info("Fetching designation with ID: {}", id);
		return designationRepository.findById(id).orElseThrow(() -> {
			log.error("Designation not found with ID: {}", id);
			return new DesignationNotFoundException("Designation not found with ID: " + id);
		});
	}

	@Override
	public List<Designation> getAllDesignations() {
		log.info("Fetching all designations");
		List<Designation> list = designationRepository.findAll();
		log.info("Total designations fetched: {}", list.size());
		return list;
	}

	@Override
	public Designation updateDesignation(Long id, Designation designation) {
		log.info("Updating designation with ID: {}", id);
		Designation existing = getDesignationById(id);
		existing.setTitle(designation.getTitle());
		existing.setDescription(designation.getDescription());
		try {
			Designation updated = designationRepository.save(existing);
			log.info("Designation updated successfully with ID: {}", updated.getDesigId());
			return updated;
		} catch (Exception e) {
			log.error("Error updating designation with ID: {}", id, e);
			throw e;
		}
	}

	@Override
	public String deleteDesignation(Long id) {
		log.info("Deleting designation with ID: {}", id);
		Designation existing = getDesignationById(id);
		try {
			designationRepository.delete(existing);
			log.info("Designation deleted successfully with ID: {}", id);
			return "Designation deleted successfully with ID: " + id;
		} catch (Exception e) {
			log.error("Error deleting designation with ID: {}", id, e);
			throw e;
		}
	}
}
