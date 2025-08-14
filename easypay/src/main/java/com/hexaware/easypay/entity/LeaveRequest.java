package com.hexaware.easypay.entity;

import jakarta.persistence.*;
//import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "leave_requests")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class LeaveRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long leaveId;

	@ManyToOne
	@JoinColumn(name = "emp_id", nullable = false)
	private Employee employee;

	private LocalDate fromDate;
	private LocalDate toDate;
	private String reason;//Sick|Casual|Earned|Maternity|Paternity
	private String status; // Pending, Approved, Rejected
	public Long getLeaveId() {
		return leaveId;
	}
	public void setLeaveId(Long leaveId) {
		this.leaveId = leaveId;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public LocalDate getFromDate() {
		return fromDate;
	}
	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}
	public LocalDate getToDate() {
		return toDate;
	}
	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
