package com.hexaware.easypay.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.entity.Payroll;
import com.hexaware.easypay.exceptions.EmployeeNotFoundException;
import com.hexaware.easypay.exceptions.PayrollNotFoundException;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.repository.PayrollRepository;
import com.hexaware.easypay.service.PayrollService;

@Service
public class PayrollServiceImpl implements PayrollService {

    private static final Logger log = LoggerFactory.getLogger(PayrollServiceImpl.class);

    @Autowired
    PayrollRepository payrollRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public Payroll createPayroll(Payroll payroll) {
        log.info("Creating payroll for employee ID: {}", 
                 payroll.getEmployee() != null ? payroll.getEmployee().getEmpId() : "null");
        try {
            if (payroll.getEmployee() != null && payroll.getEmployee().getEmpId() != null) {
                Employee emp = employeeRepository.findById(payroll.getEmployee().getEmpId())
                        .orElseThrow(() -> {
                            log.error("Employee not found with ID: {}", payroll.getEmployee().getEmpId());
                            return new EmployeeNotFoundException(
                                "Employee not found with ID: " + payroll.getEmployee().getEmpId());
                        });
                payroll.setEmployee(emp);
            }
            Payroll saved = payrollRepository.save(payroll);
            log.info("Payroll created successfully with ID: {}", saved.getPayrollId());
            return saved;
        } catch (Exception e) {
            log.error("Error creating payroll for employee", e);
            throw e;
        }
    }

    @Override
    public Payroll getPayrollById(Long id) {
        log.info("Fetching payroll with ID: {}", id);
        return payrollRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Payroll not found with ID: {}", id);
                    return new PayrollNotFoundException("Payroll not found with ID: " + id);
                });
    }

    @Override
    public List<Payroll> getAllPayrolls() {
        log.info("Fetching all payroll records");
        List<Payroll> list = payrollRepository.findAll();
        log.info("Total payroll records fetched: {}", list.size());
        return list;
    }

    @Override
    public Payroll updatePayroll(Long id, Payroll payroll) {
        log.info("Updating payroll with ID: {}", id);
        Payroll existing = getPayrollById(id);

        existing.setGrossPay(payroll.getGrossPay());
        existing.setDeductions(payroll.getDeductions());
        existing.setNetPay(payroll.getNetPay());
        existing.setMonth(payroll.getMonth());
        existing.setYear(payroll.getYear());

        if (payroll.getEmployee() != null && payroll.getEmployee().getEmpId() != null) {
            Employee emp = employeeRepository.findById(payroll.getEmployee().getEmpId())
                    .orElseThrow(() -> {
                        log.error("Employee not found with ID: {}", payroll.getEmployee().getEmpId());
                        return new EmployeeNotFoundException(
                            "Employee not found with ID: " + payroll.getEmployee().getEmpId());
                    });
            existing.setEmployee(emp);
        }

        try {
            Payroll updated = payrollRepository.save(existing);
            log.info("Payroll updated successfully with ID: {}", updated.getPayrollId());
            return updated;
        } catch (Exception e) {
            log.error("Error updating payroll with ID: {}", id, e);
            throw e;
        }
    }

    @Override
    public String deletePayroll(Long id) {
        log.info("Deleting payroll with ID: {}", id);
        try {
            payrollRepository.deleteById(id);
            log.info("Payroll deleted successfully with ID: {}", id);
            return "Payroll deleted successfully with ID: " + id;
        } catch (Exception e) {
            log.error("Error deleting payroll with ID: {}", id, e);
            throw e;
        }
    }
}
