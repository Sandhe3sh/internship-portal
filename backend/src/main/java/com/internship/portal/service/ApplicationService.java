package com.internship.portal.service;

import com.internship.portal.dto.ApplicationResponse;
import com.internship.portal.entity.Application;
import com.internship.portal.entity.Internship;
import com.internship.portal.entity.User;
import com.internship.portal.repository.ApplicationRepository;
import com.internship.portal.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final InternshipRepository internshipRepository;

    public ApplicationResponse apply(Long internshipId, User student) {
        if (applicationRepository.existsByStudentIdAndInternshipId(student.getId(), internshipId))
            throw new RuntimeException("Already applied");
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
        Application app = new Application();
        app.setStudent(student);
        app.setInternship(internship);
        return toResponse(applicationRepository.save(app));
    }

    public List<ApplicationResponse> getMyApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId).stream().map(this::toResponse).toList();
    }

    public List<ApplicationResponse> getByInternship(Long internshipId) {
        return applicationRepository.findByInternshipId(internshipId).stream().map(this::toResponse).toList();
    }

    public List<ApplicationResponse> getAllApplications() {
        return applicationRepository.findAll().stream().map(this::toResponse).toList();
    }

    public ApplicationResponse updateStatus(Long appId, String status) {
        Application app = applicationRepository.findById(appId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(Application.Status.valueOf(status.toUpperCase()));
        return toResponse(applicationRepository.save(app));
    }

    private ApplicationResponse toResponse(Application app) {
        ApplicationResponse r = new ApplicationResponse();
        r.setId(app.getId());
        r.setInternshipId(app.getInternship().getId());
        r.setInternshipTitle(app.getInternship().getTitle());
        r.setCompany(app.getInternship().getCompany());
        r.setStatus(app.getStatus().name());
        r.setAppliedAt(app.getAppliedAt());
        r.setStudentId(app.getStudent().getId());
        r.setStudentName(app.getStudent().getName());
        r.setStudentEmail(app.getStudent().getEmail());
        r.setStudentDepartment(app.getStudent().getDepartment());
        r.setStudentBatch(app.getStudent().getBatch());
        return r;
    }
}
