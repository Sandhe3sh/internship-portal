package com.internship.portal.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class InternshipRequest {
    private String title;
    private String company;
    private String description;
    private List<String> eligibleDepartments;
    private List<Integer> eligibleBatches;
    private String stipend;
    private LocalDate deadline;
    private String applyUrl;
}
