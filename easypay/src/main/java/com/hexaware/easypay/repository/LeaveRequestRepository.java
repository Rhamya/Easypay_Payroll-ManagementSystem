package com.hexaware.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.easypay.entity.LeaveRequest;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
//	List<LeaveRequest> findByEmployeeId(Long employeeId);
//
//	List<LeaveRequest> findByStatus(String status);
//
	}
