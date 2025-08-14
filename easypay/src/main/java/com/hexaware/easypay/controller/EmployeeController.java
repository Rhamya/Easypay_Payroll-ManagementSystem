package com.hexaware.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.easypay.dto.EmployeeDTO;
import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/create")
    public Employee create(@Valid @RequestBody EmployeeDTO dto) {
        Employee employee = mapDtoToEntity(dto);
        return employeeService.createEmployee(employee);
    }

    @GetMapping("/getById/{id}")
    
    public Employee getById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Employee> getAll() {
        return employeeService.getAllEmployees();
    }

    @PutMapping("/update/{id}")
   
    public Employee update(@PathVariable Long id, @Valid @RequestBody EmployeeDTO dto) {
        Employee employee = mapDtoToEntity(dto);
        return employeeService.updateEmployee(id, employee);
    }

    @DeleteMapping("/deleteById/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteById(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return "Employee deleted successfully";
    }

    // Optional: Mapping method to convert DTO → Entity
    private Employee mapDtoToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setEmpId(dto.getId());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setDateOfJoining(dto.getDateOfJoining());
        employee.setDob(dto.getDob());
        // department and designation can be set here if needed
        return employee;
    }
}
