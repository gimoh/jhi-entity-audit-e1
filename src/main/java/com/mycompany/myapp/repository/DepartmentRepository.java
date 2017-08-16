package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Department;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Department entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface DepartmentRepository extends JpaRepository<Department,Long> {
    
}
