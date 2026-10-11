package com.internship.portal.repository;

import com.internship.portal.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    @Query("SELECT i FROM Internship i WHERE " +
           "(:company IS NULL OR LOWER(i.company) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
           "(:department IS NULL OR :department MEMBER OF i.eligibleDepartments) AND " +
           "(:batch IS NULL OR :batch MEMBER OF i.eligibleBatches)")
    List<Internship> findByFilters(@Param("company") String company,
                                   @Param("department") String department,
                                   @Param("batch") Integer batch);
}
