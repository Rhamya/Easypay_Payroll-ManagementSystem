package com.hexaware.easypay.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class PayrollDTO {

    private Long payrollId;

    @NotNull(message = "Employee ID is required")
    private Long empId;

    @NotNull(message = "Gross pay is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Gross pay must be positive")
    private Double grossPay;

    @NotNull(message = "Deductions are required")
    @DecimalMin(value = "0.0", message = "Deductions cannot be negative")
    private Double deductions;

    @NotNull(message = "Net pay is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Net pay must be positive")
    private Double netPay;

    @NotBlank(message = "Month is required")
    @Pattern(regexp = "January|February|March|April|May|June|July|August|September|October|November|December",
             message = "Month must be a valid month name")
    private String month;

    @Positive(message = "Year must be positive")
    private int year;

    @NotBlank(message = "Status is required")
    private String status;

    // Getters and setters ...

    public Long getPayrollId() { return payrollId; }
    public void setPayrollId(Long payrollId) { this.payrollId = payrollId; }
    public Long getEmpId() { return empId; }
    public void setEmpId(Long empId) { this.empId = empId; }
    public Double getGrossPay() { return grossPay; }
    public void setGrossPay(Double grossPay) { this.grossPay = grossPay; }
    public Double getDeductions() { return deductions; }
    public void setDeductions(Double deductions) { this.deductions = deductions; }
    public Double getNetPay() { return netPay; }
    public void setNetPay(Double netPay) { this.netPay = netPay; }
    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
