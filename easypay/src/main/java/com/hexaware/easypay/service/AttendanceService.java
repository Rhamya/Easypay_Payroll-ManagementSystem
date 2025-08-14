package com.hexaware.easypay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.Attendance;

@Service
public interface AttendanceService {
	Attendance create(Attendance attendance);

	Attendance update(Long attendanceId, Attendance attendance);

	Attendance getById(Long attendanceId);

	List<Attendance> getAll();

	String deleteById(Long attendanceId);
}
