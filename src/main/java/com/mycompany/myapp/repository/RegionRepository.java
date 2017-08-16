package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Region;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Region entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface RegionRepository extends JpaRepository<Region,Long> {
    
}
