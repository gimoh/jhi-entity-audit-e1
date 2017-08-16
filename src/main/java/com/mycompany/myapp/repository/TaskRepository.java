package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Task;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface TaskRepository extends JpaRepository<Task,Long> {
    
}
