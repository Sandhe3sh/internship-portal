package com.internship.portal.service;

import com.internship.portal.dto.InternshipRequest;
import com.internship.portal.dto.InternshipResponse;
import com.internship.portal.entity.Internship;
import com.internship.portal.entity.User;
import com.internship.portal.repository.ApplicationRepository;
import com.internship.portal.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InternshipService {
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;

    public InternshipResponse create(InternshipRequest req, User admin) {
        Internship i = toEntity(req);
        i.setCreatedBy(admin);
        return toResponse(internshipRepository.save(i), null);
    }

    public InternshipResponse update(Long id, InternshipRequest req) {
        Internship i = internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
        i.setTitle(req.getTitle());
        i.setCompany(req.getCompany());
        i.setDescription(req.getDescription());
        i.setEligibleDepartments(req.getEligibleDepartments());
        i.setEligibleBatches(req.getEligibleBatches());
        i.setStipend(req.getStipend());
        i.setDeadline(req.getDeadline());
        i.setApplyUrl(req.getApplyUrl());
        return toResponse(internshipRepository.save(i), null);
    }

    public void delete(Long id) {
        internshipRepository.deleteById(id);
    }

    public List<InternshipResponse> getAll(String company, String department, Integer batch, User currentUser) {
        List<Internship> list = internshipRepository.findByFilters(company, department, batch);
        return list.stream().map(i -> toResponse(i, currentUser)).toList();
    }

    public InternshipResponse getById(Long id, User currentUser) {
        Internship i = internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
        return toResponse(i, currentUser);
    }

    private Internship toEntity(InternshipRequest req) {
        Internship i = new Internship();
        i.setTitle(req.getTitle());
        i.setCompany(req.getCompany());
        i.setDescription(req.getDescription());
        i.setEligibleDepartments(req.getEligibleDepartments());
        i.setEligibleBatches(req.getEligibleBatches());
        i.setStipend(req.getStipend());
        i.setDeadline(req.getDeadline());
        i.setApplyUrl(req.getApplyUrl());
        return i;
    }

    public InternshipResponse toResponse(Internship i, User user) {
        InternshipResponse r = new InternshipResponse();
        r.setId(i.getId());
        r.setTitle(i.getTitle());
        r.setCompany(i.getCompany());
        r.setDescription(i.getDescription());
        r.setEligibleDepartments(i.getEligibleDepartments());
        r.setEligibleBatches(i.getEligibleBatches());
        r.setStipend(i.getStipend());
        r.setDeadline(i.getDeadline());
        r.setApplyUrl(i.getApplyUrl());
        r.setApplicantCount(applicationRepository.findByInternshipId(i.getId()).size());
        if (user != null && user.getRole() == User.Role.STUDENT) {
            r.setEligible(
                (i.getEligibleDepartments() == null || i.getEligibleDepartments().contains(user.getDepartment())) &&
                (i.getEligibleBatches() == null || i.getEligibleBatches().contains(user.getBatch()))
            );
            r.setApplied(applicationRepository.existsByStudentIdAndInternshipId(user.getId(), i.getId()));
        }
        return r;
    }
}
