package com.hexaware.easypay.entity;

import jakarta.persistence.*;
//import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class Attendance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long attendanceId;

	@ManyToOne
	@JoinColumn(name = "emp_id", nullable = false)
	private Employee employee;

	private LocalDate date;
	private String status; // Present, Absent, Leave
	public Long getAttendanceId() {
		return attendanceId;
	}
	public void setAttendanceId(Long attendanceId) {
		this.attendanceId = attendanceId;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
