package com.hexaware.easypay.service;

import java.util.List;

import com.hexaware.easypay.dto.LeaveRequestDTO;

public interface LeaveRequestService {

	LeaveRequestDTO createLeave(LeaveRequestDTO leaveRequestDTO);

	LeaveRequestDTO updateLeave(Long requestId, LeaveRequestDTO leaveRequestDTO);

	void deleteLeaveRequest(Long requestId);

	LeaveRequestDTO getLeaveById(Long requestId);

	List<LeaveRequestDTO> getAllLeaveRequests();

	LeaveRequestDTO approveLeaveRequest(Long requestId);

	LeaveRequestDTO rejectLeaveRequest(Long requestId);
}
