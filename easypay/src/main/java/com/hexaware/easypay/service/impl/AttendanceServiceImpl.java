package com.hexaware.easypay.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.Attendance;
import com.hexaware.easypay.entity.Employee;
import com.hexaware.easypay.exceptions.AttendanceNotFoundException;
import com.hexaware.easypay.exceptions.EmployeeNotFoundException;
import com.hexaware.easypay.repository.AttendanceRepository;
import com.hexaware.easypay.repository.EmployeeRepository;
import com.hexaware.easypay.service.AttendanceService;

@Service
public class AttendanceServiceImpl implements AttendanceService {

	@Autowired
	private AttendanceRepository attendanceRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@Override
	public Attendance create(Attendance attendance) {
		if (attendance.getEmployee() != null && attendance.getEmployee().getEmpId() != null) {
			Employee emp = employeeRepository.findById(attendance.getEmployee().getEmpId())
					.orElseThrow(() -> new EmployeeNotFoundException(
							"Employee not found with ID: " + attendance.getEmployee().getEmpId()));
			attendance.setEmployee(emp);
		}

		if (attendance.getDate() == null) {
			attendance.setDate(LocalDate.now());
		}

		return attendanceRepository.save(attendance);
	}

	@Override
	public Attendance getById(Long id) {
		return attendanceRepository.findById(id)
				.orElseThrow(() -> new AttendanceNotFoundException("Attendance not found with ID: " + id));
	}

	@Override
	public List<Attendance> getAll() {
		return attendanceRepository.findAll();
	}

	@Override
	public Attendance update(Long id, Attendance attendance) {
		Attendance existing = getById(id);

		existing.setStatus(attendance.getStatus());
		if (attendance.getDate() != null) {
			existing.setDate(attendance.getDate());
		}

		if (attendance.getEmployee() != null && attendance.getEmployee().getEmpId() != null) {
			Employee emp = employeeRepository.findById(attendance.getEmployee().getEmpId())
					.orElseThrow(() -> new EmployeeNotFoundException(
							"Employee not found with ID: " + attendance.getEmployee().getEmpId()));
			existing.setEmployee(emp);
		}

		return attendanceRepository.save(existing);
	}

	@Override
	public String deleteById(Long id) {
		Attendance existing = getById(id);
		attendanceRepository.delete(existing);
		return "Attendance record deleted successfully with ID: " + id;
	}
}
