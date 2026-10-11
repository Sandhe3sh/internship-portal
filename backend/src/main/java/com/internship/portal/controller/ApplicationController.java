package com.internship.portal.controller;

import com.internship.portal.dto.ApplicationResponse;
import com.internship.portal.entity.User;
import com.internship.portal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping("/apply/{internshipId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApplicationResponse> apply(@PathVariable Long internshipId,
                                                      @AuthenticationPrincipal User student) {
        return ResponseEntity.ok(applicationService.apply(internshipId, student));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ApplicationResponse>> myApplications(@AuthenticationPrincipal User student) {
        return ResponseEntity.ok(applicationService.getMyApplications(student.getId()));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> allApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/internship/{internshipId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> byInternship(@PathVariable Long internshipId) {
        return ResponseEntity.ok(applicationService.getByInternship(internshipId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(@PathVariable Long id,
                                                             @RequestParam String status) {
        return ResponseEntity.ok(applicationService.updateStatus(id, status));
    }
}
