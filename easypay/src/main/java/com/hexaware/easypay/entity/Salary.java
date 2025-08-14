package com.hexaware.easypay.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
//import lombok.*;

@Entity
@Table(name = "salaries")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long salaryId;

    @OneToOne
    @JoinColumn(name = "emp_id", nullable = false)
    private Employee employee;

    private Double basic;
    private Double hra;
    private Double bonus;
    private Double pf;
    private Double tax;
    private Double otherDeductions;
	public Long getSalaryId() {
		return salaryId;
	}
	public void setSalaryId(Long salaryId) {
		this.salaryId = salaryId;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public Double getBasic() {
		return basic;
	}
	public void setBasic(Double basic) {
		this.basic = basic;
	}
	public Double getHra() {
		return hra;
	}
	public void setHra(Double hra) {
		this.hra = hra;
	}
	public Double getBonus() {
		return bonus;
	}
	public void setBonus(Double bonus) {
		this.bonus = bonus;
	}
	public Double getPf() {
		return pf;
	}
	public void setPf(Double pf) {
		this.pf = pf;
	}
	public Double getTax() {
		return tax;
	}
	public void setTax(Double tax) {
		this.tax = tax;
	}
	public Double getOtherDeductions() {
		return otherDeductions;
	}
	public void setOtherDeductions(Double otherDeductions) {
		this.otherDeductions = otherDeductions;
	}
    
    
    
    
    
}
