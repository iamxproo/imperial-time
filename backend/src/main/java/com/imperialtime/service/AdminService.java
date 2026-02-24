package com.imperialtime.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.imperialtime.dto.AdminLoginRequest;
import com.imperialtime.dto.AdminResponse;
import com.imperialtime.model.Admin;
import com.imperialtime.repository.AdminRepository;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public AdminResponse login(AdminLoginRequest request) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(request.getEmail());
        
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
                return new AdminResponse(
                    admin.getId(),
                    admin.getEmail(),
                    admin.getFirstName(),
                    admin.getLastName(),
                    admin.getRole(),
                    "admin_token_" + admin.getId()
                );
            }
        }
        return null;
    }
    
    public void initializeDefaultAdmin() {
        if (!adminRepository.existsByEmail("samarthkarale21@gmail.com")) {
            Admin admin = new Admin();
            admin.setEmail("samarthkarale21@gmail.com");
            admin.setPassword(passwordEncoder.encode("Sam@2003"));
            admin.setFirstName("Samarth");
            admin.setLastName("Karale");
            admin.setRole("ADMIN");
            admin.setActive(true);
            adminRepository.save(admin);
        }
    }
    
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}

