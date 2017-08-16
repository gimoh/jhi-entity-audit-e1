package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Country;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Country entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CountryRepository extends JpaRepository<Country,Long> {
    
}
