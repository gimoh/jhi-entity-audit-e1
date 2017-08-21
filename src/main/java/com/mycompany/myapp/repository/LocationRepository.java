package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Location;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Location entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface LocationRepository extends JpaRepository<Location,Long> {
    
}