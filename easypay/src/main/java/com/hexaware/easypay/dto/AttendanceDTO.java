package com.hexaware.easypay.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AttendanceDTO {

    private Long attendanceId;

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotBlank(message = "Employee name is required")
    @Size(max = 50, message = "Employee name must be less than 50 characters")
    private String employeeName;

    @NotBlank(message = "Date is required")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Date must be in YYYY-MM-DD format")
    private String date;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "PRESENT|ABSENT|LEAVE", message = "Status must be PRESENT, ABSENT, or LEAVE")
    private String status;

    // Getters and setters
    public Long getId() { return attendanceId; }
    public void setId(Long attendanceId) { this.attendanceId = attendanceId; }
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
