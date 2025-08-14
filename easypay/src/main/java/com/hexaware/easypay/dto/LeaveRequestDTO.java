package com.hexaware.easypay.dto;

//import lombok.Data;

//
//@Data

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class LeaveRequestDTO {

	private Long id;

	@NotNull(message = "Employee ID is required")
	private Long employeeId;

	@NotBlank(message = "Employee name is required")
	@Size(max = 50, message = "Employee name must be less than 50 characters")
	private String employeeName;

	@NotBlank(message = "Leave type is required")
	@Pattern(regexp = "Sick|Casual|Earned|Maternity|Paternity", message = "Invalid leave type")
	private String leaveType;

	@NotBlank(message = "Status is required")

	
	private String status;

	@NotBlank(message = "Start date is required")

	private String startDate;

	@NotBlank(message = "End date is required")

	private String endDate;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

}
