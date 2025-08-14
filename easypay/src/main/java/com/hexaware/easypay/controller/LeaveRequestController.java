package com.hexaware.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.hexaware.easypay.dto.LeaveRequestDTO;
import com.hexaware.easypay.service.LeaveRequestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/leaverequest")
public class LeaveRequestController {

	@Autowired
	private LeaveRequestService leaveService;

	// Employee can post leave requests
	@PreAuthorize("hasRole('EMPLOYEE')")
	@PostMapping("/create")
	public ResponseEntity<LeaveRequestDTO> createLeave(@Valid @RequestBody LeaveRequestDTO dto) {
		return ResponseEntity.ok(leaveService.createLeave(dto));
	}

	// Manager/Supervisor can view all leave requests
	@PreAuthorize("hasAnyRole('MANAGER', 'SUPERVISOR')")
	@GetMapping("/getAll")
	public ResponseEntity<List<LeaveRequestDTO>> getAllLeaves() {
		return ResponseEntity.ok(leaveService.getAllLeaveRequests());
	}

	// Manager/Supervisor can view leave by ID
	@PreAuthorize("hasAnyRole('MANAGER', 'SUPERVISOR')")
	@GetMapping("/getById/{id}")
	public ResponseEntity<LeaveRequestDTO> getLeaveById(@PathVariable Long id) {
		return ResponseEntity.ok(leaveService.getLeaveById(id));
	}

	// Manager/Supervisor can update leave requests
	@PreAuthorize("hasAnyRole('MANAGER', 'SUPERVISOR')")
	@PutMapping("/updateById/{id}")
	public ResponseEntity<LeaveRequestDTO> updateLeave(@PathVariable Long id, @RequestBody LeaveRequestDTO dto) {
		return ResponseEntity.ok(leaveService.updateLeave(id, dto));
	}

	// Manager/Supervisor can approve leave
	@PreAuthorize("hasAnyRole('MANAGER', 'SUPERVISOR')")
	@PostMapping("/{id}/approve")
	public ResponseEntity<LeaveRequestDTO> approveLeave(@PathVariable Long id) {
		return ResponseEntity.ok(leaveService.approveLeaveRequest(id));
	}

	// Manager/Supervisor can reject leave
	@PreAuthorize("hasAnyRole('MANAGER', 'SUPERVISOR')")
	@PostMapping("/{id}/reject")
	public ResponseEntity<LeaveRequestDTO> rejectLeave(@PathVariable Long id) {
		return ResponseEntity.ok(leaveService.rejectLeaveRequest(id));
	}

	// Manager/Supervisor can delete leave requests
	@PreAuthorize("hasAnyRole('MANAGER', 'SUPERVISOR')")
	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<String> deleteLeave(@PathVariable Long id) {
		leaveService.deleteLeaveRequest(id);
		return ResponseEntity.ok("Leave request deleted successfully");
	}
}
