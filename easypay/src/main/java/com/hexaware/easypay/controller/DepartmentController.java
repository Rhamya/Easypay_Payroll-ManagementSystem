package com.hexaware.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.easypay.entity.Department;
import com.hexaware.easypay.service.DepartmentService;

@RestController
@RequestMapping("/api/dept")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/create")
    public Department create(@RequestBody Department department) {
        return departmentService.createDepartment(department);
    }

    @GetMapping("/getById/{id}")
    public Department getById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

    @GetMapping("/getAll")
    public List<Department> getAll() {
        return departmentService.getAllDepartments();
    }

    @PutMapping("/update/{id}")
    public Department update(@PathVariable Long id, @RequestBody Department department) {
        return departmentService.updateDepartment(id, department);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return "Department deleted successfully";
    }

    // Optional: Add filtering endpoints if needed
    // Example: Get departments by name
    // @GetMapping("/getByName/{name}")
    // public List<Department> getByName(@PathVariable String name) {
    //     return departmentService.getDepartmentsByName(name);
    // }
}
