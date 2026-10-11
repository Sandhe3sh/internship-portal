package com.internship.portal.controller;

import com.internship.portal.dto.InternshipRequest;
import com.internship.portal.dto.InternshipResponse;
import com.internship.portal.entity.User;
import com.internship.portal.service.InternshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
public class InternshipController {
    private final InternshipService internshipService;

    @GetMapping
    public ResponseEntity<List<InternshipResponse>> getAll(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer batch,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(internshipService.getAll(company, department, batch, currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipResponse> getById(@PathVariable Long id,
                                                       @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(internshipService.getById(id, currentUser));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InternshipResponse> create(@RequestBody InternshipRequest req,
                                                      @AuthenticationPrincipal User admin) {
        return ResponseEntity.ok(internshipService.create(req, admin));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InternshipResponse> update(@PathVariable Long id,
                                                      @RequestBody InternshipRequest req) {
        return ResponseEntity.ok(internshipService.update(id, req));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        internshipService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
