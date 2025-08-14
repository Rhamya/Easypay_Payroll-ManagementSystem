package com.hexaware.easypay.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
//import lombok.*;

@Entity
@Table(name = "payrolls")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class Payroll {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long payrollId;

	// Payroll.java
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "emp_id", nullable = false)
	private Employee employee;

	@Column(nullable = false)
	private String month; // e.g. "JAN", "FEB" or store as integer

	@Column(nullable = false)
	private Integer year;

	private Double grossPay;
	private Double deductions;
	private Double netPay;

	private String status; // Processed, Approved, Paid

	public Long getPayrollId() {
		return payrollId;
	}

	public void setPayrollId(Long payrollId) {
		this.payrollId = payrollId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Double getGrossPay() {
		return grossPay;
	}

	public void setGrossPay(Double grossPay) {
		this.grossPay = grossPay;
	}

	public Double getDeductions() {
		return deductions;
	}

	public void setDeductions(Double deductions) {
		this.deductions = deductions;
	}

	public Double getNetPay() {
		return netPay;
	}

	public void setNetPay(Double netPay) {
		this.netPay = netPay;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
	
}
