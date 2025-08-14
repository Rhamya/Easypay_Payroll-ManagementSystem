package com.hexaware.easypay.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.easypay.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
//	List<Attendance> findByEmployeeId(Long empId);

//	List<Attendance> findByDate(LocalDate date);
}
