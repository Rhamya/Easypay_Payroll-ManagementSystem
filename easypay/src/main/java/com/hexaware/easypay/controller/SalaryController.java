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

import com.hexaware.easypay.dto.SalaryDTO;
import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.entity.Salary;
import com.hexaware.easypay.service.SalaryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    @Autowired
    private SalaryService salaryService;

    @PostMapping("/create")
    public Salary create(@Valid @RequestBody SalaryDTO dto) {
        Salary salary = mapDtoToEntity(dto);
        return salaryService.create(salary);
    }

    @GetMapping("/getById/{id}")
    
    public Salary getById(@PathVariable long id) {
        return salaryService.getById(id);
    }

    @GetMapping("/getAll")
    public List<Salary> getAll() {
        return salaryService.getAll();
    }

    @PutMapping("/update/{id}")
    public Salary update(@PathVariable Long id, @Valid @RequestBody SalaryDTO dto) {
        Salary salary = mapDtoToEntity(dto);
        return salaryService.update(id, salary);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable long id) {
        return salaryService.deleteById(id);
    }

    // --- Mapping method ---
    private Salary mapDtoToEntity(SalaryDTO dto) {
        Salary salary = new Salary();
        salary.setSalaryId(dto.getId());
        salary.setBasic(dto.getBasic());
        salary.setHra(dto.getHra());
        salary.setBonus(dto.getBonus());
        salary.setPf(dto.getPf());
        salary.setTax(dto.getTax());
        salary.setOtherDeductions(dto.getOtherDeductions());

        if (dto.getEmployeeId() != null) {
            Employee emp = new Employee();
            emp.setEmpId(dto.getEmployeeId());
            salary.setEmployee(emp); // only ID is set; service will fetch the full Employee entity
        }
        return salary;
    }
}
