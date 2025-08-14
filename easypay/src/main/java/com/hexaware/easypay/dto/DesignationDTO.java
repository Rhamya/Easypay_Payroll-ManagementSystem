package com.hexaware.easypay.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DesignationDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 50, message = "Title must be less than 50 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 200, message = "Description must be less than 200 characters")
    private String description;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
