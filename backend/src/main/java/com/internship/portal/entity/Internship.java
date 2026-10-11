package com.internship.portal.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "internships")
@Data
public class Internship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "internship_departments", joinColumns = @JoinColumn(name = "internship_id"))
    @Column(name = "department")
    private List<String> eligibleDepartments;

    @ElementCollection
    @CollectionTable(name = "internship_batches", joinColumns = @JoinColumn(name = "internship_id"))
    @Column(name = "batch")
    private List<Integer> eligibleBatches;

    private String stipend;
    private LocalDate deadline;

    @Column(name = "apply_url")
    private String applyUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
}
