package com.internship.portal.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationResponse {
    private Long id;
    private Long internshipId;
    private String internshipTitle;
    private String company;
    private String status;
    private LocalDateTime appliedAt;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String studentDepartment;
    private Integer studentBatch;
}
