package com.hexaware.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.easypay.dto.AttendanceDTO;
import com.hexaware.easypay.entity.Attendance;
import com.hexaware.easypay.service.AttendanceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/create")
    public Attendance create(@Valid @RequestBody AttendanceDTO dto) {
        Attendance attendance = mapDtoToEntity(dto);
        return attendanceService.create(attendance);
    }

    @GetMapping("/getById/{id}")
    public Attendance getById(@PathVariable Long id) {
        return attendanceService.getById(id);
    }

    @GetMapping("/getAll")
    public List<Attendance> getAll() {
        return attendanceService.getAll();
    }

    @PutMapping("/update/{id}")
    public Attendance update(@PathVariable Long id, @Valid @RequestBody AttendanceDTO dto) {
        Attendance attendance = mapDtoToEntity(dto);
        return attendanceService.update(id, attendance);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable Long id) {
        return attendanceService.deleteById(id);
    }

    private Attendance mapDtoToEntity(AttendanceDTO dto) {
        Attendance attendance = new Attendance();
        attendance.setAttendanceId(dto.getId());
        attendance.setStatus(dto.getStatus());
        // date will be handled in service if necessary
        // employee will be resolved in service using employeeId
        return attendance;
    }
}
