package com.hexaware.easypay.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DepartmentDTO {

    private Long id;

    @NotBlank(message = "Department name is required")
    @Size(max = 50, message = "Department name must be less than 50 characters")
    private String name;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
