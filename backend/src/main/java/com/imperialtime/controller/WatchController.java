package com.imperialtime.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.imperialtime.model.Watch;
import com.imperialtime.repository.WatchRepository;

@RestController
@RequestMapping("/api/watches")
@CrossOrigin(origins = "*")
public class WatchController {
    
    @Autowired
    private WatchRepository watchRepository;
    
    @GetMapping
    public ResponseEntity<List<Watch>> getAllWatches() {
        try {
            List<Watch> watches = watchRepository.findAll();
            return ResponseEntity.ok(watches);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Paginated + sorted watches endpoint for frontend
    @GetMapping("/paged")
    public ResponseEntity<?> getPagedWatches(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        try {
            Sort sort = Sort.by(sortBy);
            sort = "desc".equalsIgnoreCase(sortDir) ? sort.descending() : sort.ascending();
            PageRequest pr = PageRequest.of(page, size, sort);
            Page<Watch> p = watchRepository.findAll(pr);
            Map<String, Object> resp = new HashMap<>();
            resp.put("content", p.getContent());
            resp.put("page", p.getNumber());
            resp.put("size", p.getSize());
            resp.put("totalElements", p.getTotalElements());
            resp.put("totalPages", p.getTotalPages());
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch paged watches: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Watch> getWatchById(@PathVariable Long id) {
        try {
            Optional<Watch> watch = watchRepository.findById(id);
            if (watch.isPresent()) {
                return ResponseEntity.ok(watch.get());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Watch>> getActiveWatches() {
        try {
            List<Watch> watches = watchRepository.findByActiveTrue();
            return ResponseEntity.ok(watches);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Watch>> searchWatches(@RequestParam String query) {
        try {
            List<Watch> watches = watchRepository.findByNameContainingIgnoreCase(query);
            return ResponseEntity.ok(watches);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Watch>> getWatchesByBrand(@PathVariable String brand) {
        try {
            List<Watch> watches = watchRepository.findByBrandIgnoreCase(brand);
            return ResponseEntity.ok(watches);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createWatch(@RequestBody Watch watch) {
        try {
            Watch saved = watchRepository.save(watch);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create watch: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateWatch(@PathVariable Long id, @RequestBody Watch watch) {
        try {
            return watchRepository.findById(id).map(existing -> {
                existing.setName(watch.getName());
                existing.setPrice(watch.getPrice());
                existing.setDescription(watch.getDescription());
                existing.setBrand(watch.getBrand());
                existing.setModel(watch.getModel());
                existing.setColor(watch.getColor());
                existing.setStock(watch.getStock());
                existing.setActive(watch.getActive());
                existing.setImageUrl(watch.getImageUrl());
                watchRepository.save(existing);
                return ResponseEntity.ok(existing);
            }).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update watch: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWatch(@PathVariable Long id) {
        try {
            if (!watchRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            watchRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete watch: " + e.getMessage());
        }
    }
}

