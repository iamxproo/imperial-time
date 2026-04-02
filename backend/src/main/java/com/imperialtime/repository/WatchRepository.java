package com.imperialtime.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.imperialtime.model.Watch;

@Repository
public interface WatchRepository extends JpaRepository<Watch, Long> {
    Optional<Watch> findBySku(String sku);
    
    List<Watch> findByBrandIgnoreCase(String brand);

    List<Watch> findByActive(Boolean active);
    
    List<Watch> findByActiveTrue();
    
    List<Watch> findByBrandAndActive(String brand, Boolean active);
    
    List<Watch> findByNameContainingIgnoreCase(String name);
    
    List<Watch> findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(String name, String brand);
    
    List<Watch> findByModelIgnoreCase(String model);
}
