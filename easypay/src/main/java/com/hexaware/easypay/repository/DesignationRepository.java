package com.hexaware.easypay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.easypay.entity.Designation;

public interface DesignationRepository extends JpaRepository<Designation, Long> {
//	boolean existsByTitle(String title);
}
