package com.imperialtime.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.imperialtime.model.Admin;
import com.imperialtime.repository.AdminRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        try {
            // Initialize default admin user
            if (!adminRepository.existsByEmail("samarthkarale21@gmail.com")) {
                Admin admin = new Admin();
                admin.setEmail("samarthkarale21@gmail.com");
                admin.setPassword(passwordEncoder.encode("Sam@2003"));
                admin.setFirstName("Samarth");
                admin.setLastName("Karale");
                admin.setPhoneNumber("+91-9000000000");
                admin.setRole("ADMIN");
                admin.setActive(true);
                adminRepository.save(admin);
                System.out.println("✓ Default admin user created successfully!");
                System.out.println("  Email: samarthkarale21@gmail.com");
                System.out.println("  Password: Sam@2003");
            } else {
                System.out.println("✓ Admin user already exists");
            }
        } catch (Exception e) {
            System.err.println("❌ Error initializing admin user: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

