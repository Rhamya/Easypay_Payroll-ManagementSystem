package com.hexaware.easypay.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hexaware.easypay.dto.LeaveRequestDTO;
import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.entity.LeaveRequest;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.repository.LeaveRequestRepository;
import com.hexaware.easypay.service.LeaveRequestService;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

	private final LeaveRequestRepository leaveRepository;
	private final EmployeeRepository employeeRepository;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	public LeaveRequestServiceImpl(LeaveRequestRepository leaveRepository, EmployeeRepository employeeRepository) {
		this.leaveRepository = leaveRepository;
		this.employeeRepository = employeeRepository;
	}

	// Convert Entity → DTO
	private LeaveRequestDTO toDTO(LeaveRequest leave) {
		LeaveRequestDTO dto = new LeaveRequestDTO();
		dto.setId(leave.getLeaveId());
		if (leave.getEmployee() != null) {
			dto.setEmployeeId(leave.getEmployee().getEmpId());
			dto.setEmployeeName(leave.getEmployee().getFirstName() + " " + leave.getEmployee().getLastName());
		}
		dto.setLeaveType(leave.getReason());
		dto.setStatus(leave.getStatus());
		dto.setStartDate(leave.getFromDate() != null ? leave.getFromDate().format(formatter) : null);
		dto.setEndDate(leave.getToDate() != null ? leave.getToDate().format(formatter) : null);
		return dto;
	}

	// Convert DTO → Entity
	private LeaveRequest toEntity(LeaveRequestDTO dto) {
		LeaveRequest leave = new LeaveRequest();
		leave.setReason(dto.getLeaveType());
		leave.setStatus(dto.getStatus() != null ? dto.getStatus() : "PENDING");

		if (dto.getStartDate() != null) {
			leave.setFromDate(LocalDate.parse(dto.getStartDate(), formatter));
		}
		if (dto.getEndDate() != null) {
			leave.setToDate(LocalDate.parse(dto.getEndDate(), formatter));
		}

		if (dto.getEmployeeId() != null) {
			Employee emp = employeeRepository.findById(dto.getEmployeeId())
					.orElseThrow(() -> new RuntimeException("Employee not found with ID: " + dto.getEmployeeId()));
			leave.setEmployee(emp);
		}

		return leave;
	}

	@Override
	public LeaveRequestDTO createLeave(LeaveRequestDTO leaveDTO) {
		LeaveRequest leave = toEntity(leaveDTO);
		LeaveRequest saved = leaveRepository.save(leave);
		return toDTO(saved);
	}

	@Override
	public LeaveRequestDTO updateLeave(Long requestId, LeaveRequestDTO leaveDTO) {
		LeaveRequest existing = leaveRepository.findById(requestId)
				.orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + requestId));

		existing.setReason(leaveDTO.getLeaveType());
		existing.setStatus(leaveDTO.getStatus());

		if (leaveDTO.getStartDate() != null) {
			existing.setFromDate(LocalDate.parse(leaveDTO.getStartDate(), formatter));
		}
		if (leaveDTO.getEndDate() != null) {
			existing.setToDate(LocalDate.parse(leaveDTO.getEndDate(), formatter));
		}

		if (leaveDTO.getEmployeeId() != null) {
			Employee emp = employeeRepository.findById(leaveDTO.getEmployeeId())
					.orElseThrow(() -> new RuntimeException("Employee not found with ID: " + leaveDTO.getEmployeeId()));
			existing.setEmployee(emp);
		}

		LeaveRequest updated = leaveRepository.save(existing);
		return toDTO(updated);
	}

	@Override
	public void deleteLeaveRequest(Long requestId) {
		LeaveRequest existing = leaveRepository.findById(requestId)
				.orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + requestId));
		leaveRepository.delete(existing);
	}

	@Override
	public LeaveRequestDTO getLeaveById(Long requestId) {
		LeaveRequest leave = leaveRepository.findById(requestId)
				.orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + requestId));
		return toDTO(leave);
	}

	@Override
	public List<LeaveRequestDTO> getAllLeaveRequests() {
		return leaveRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public LeaveRequestDTO approveLeaveRequest(Long requestId) {
		LeaveRequest leave = leaveRepository.findById(requestId)
				.orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + requestId));
		leave.setStatus("APPROVED");
		LeaveRequest updated = leaveRepository.save(leave);
		return toDTO(updated);
	}

	@Override
	public LeaveRequestDTO rejectLeaveRequest(Long requestId) {
		LeaveRequest leave = leaveRepository.findById(requestId)
				.orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + requestId));
		leave.setStatus("REJECTED");
		LeaveRequest updated = leaveRepository.save(leave);
		return toDTO(updated);
	}
}
