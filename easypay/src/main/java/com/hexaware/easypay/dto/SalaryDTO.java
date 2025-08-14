package com.hexaware.easypay.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SalaryDTO {

    private Long id;

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotNull(message = "Basic salary is required")
    @Min(value = 0, message = "Basic salary must be non-negative")
    private Double basic;

    @NotNull(message = "HRA is required")
    @Min(value = 0, message = "HRA must be non-negative")
    private Double hra;

    @NotNull(message = "Bonus is required")
    @Min(value = 0, message = "Bonus must be non-negative")
    private Double bonus;

    @NotNull(message = "PF is required")
    @Min(value = 0, message = "PF must be non-negative")
    private Double pf;

    @NotNull(message = "Tax is required")
    @Min(value = 0, message = "Tax must be non-negative")
    private Double tax;

    @NotNull(message = "Other deductions are required")
    @Min(value = 0, message = "Other deductions must be non-negative")
    private Double otherDeductions;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Double getBasic() { return basic; }
    public void setBasic(Double basic) { this.basic = basic; }

    public Double getHra() { return hra; }
    public void setHra(Double hra) { this.hra = hra; }

    public Double getBonus() { return bonus; }
    public void setBonus(Double bonus) { this.bonus = bonus; }

    public Double getPf() { return pf; }
    public void setPf(Double pf) { this.pf = pf; }

    public Double getTax() { return tax; }
    public void setTax(Double tax) { this.tax = tax; }

    public Double getOtherDeductions() { return otherDeductions; }
    public void setOtherDeductions(Double otherDeductions) { this.otherDeductions = otherDeductions; }
}
