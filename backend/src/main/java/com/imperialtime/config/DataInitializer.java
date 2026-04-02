package com.imperialtime.config;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.imperialtime.model.Admin;
import com.imperialtime.model.Watch;
import com.imperialtime.repository.AdminRepository;
import com.imperialtime.repository.WatchRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private WatchRepository watchRepository;
    
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
            
            // Initialize watches if none exist
            if (watchRepository.count() == 0) {
                List<Watch> watches = Arrays.asList(
                    createWatch("Rolex Submariner", "RLX-SUB-001", "Rolex", "Submariner", "Black", "Oyster Steel", "Automatic", 48000, 5),
                    createWatch("Rolex Daytona", "RLX-DAY-002", "Rolex", "Daytona", "Silver", "Oyster Steel", "Automatic", 46000, 3),
                    createWatch("Rolex Datejust", "RLX-DAT-003", "Rolex", "Datejust", "Gold", "Yellow Gold", "Automatic", 42000, 4),
                    createWatch("Omega Seamaster", "OMG-SEA-001", "Omega", "Seamaster", "Blue", "Stainless Steel", "Automatic", 38000, 6),
                    createWatch("Omega Speedmaster", "OMG-SPD-002", "Omega", "Speedmaster", "Silver", "Stainless Steel", "Manual", 44000, 4),
                    createWatch("TAG Heuer Monaco", "TAG-MON-001", "TAG Heuer", "Monaco", "Blue", "Titanium", "Automatic", 35000, 2),
                    createWatch("Patek Philippe Aquanaut", "PTE-AQU-001", "Patek Philippe", "Aquanaut", "Black", "Rubber", "Automatic", 49000, 1),
                    createWatch("Patek Philippe Nautilus", "PTE-NAU-002", "Patek Philippe", "Nautilus", "Blue", "Stainless Steel", "Automatic", 47500, 1),
                    createWatch("Audemars Piguet Royal Oak", "AP-ROY-001", "Audemars Piguet", "Royal Oak", "Silver", "Stainless Steel", "Automatic", 45000, 1),
                    createWatch("IWC Portugieser", "IWC-PRT-001", "IWC", "Portugieser", "Silver", "Stainless Steel", "Automatic", 39000, 3),
                    createWatch("Cartier Ballon Bleu", "CRT-BLB-001", "Cartier", "Ballon Bleu", "Silver", "Stainless Steel", "Automatic", 33000, 5),
                    createWatch("Longines HydroConquest", "LNG-HYD-001", "Longines", "HydroConquest", "Black", "Ceramic", "Automatic", 22000, 8),
                    createWatch("Tudor Black Bay", "TDT-BKB-001", "Tudor", "Black Bay", "Black", "Stainless Steel", "Automatic", 27000, 4),
                    createWatch("Zenith Chronomaster", "ZEN-CHR-001", "Zenith", "Chronomaster", "Silver", "Stainless Steel", "Automatic", 31000, 2),
                    createWatch("Breitling Navitimer", "BRG-NAV-001", "Breitling", "Navitimer", "Black", "Stainless Steel", "Automatic", 36500, 3),
                    createWatch("Grand Seiko Spring Drive", "GSG-SPR-001", "Grand Seiko", "Spring Drive", "Silver", "Titanium", "Spring Drive", 43000, 2)
                );
                
                watchRepository.saveAll(watches);
                System.out.println("✓ Initialized " + watches.size() + " watches successfully!");
            } else {
                System.out.println("✓ Watches already exist in database");
            }
        } catch (Exception e) {
            System.err.println("❌ Error initializing data: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private int imageCounter = 1;

    private Watch createWatch(String name, String sku, String brand, String model, String color, 
                              String material, String movement, double price, int stock) {
        Watch watch = new Watch();
        watch.setName(name);
        watch.setSku(sku);
        watch.setDescription("Luxury timepiece from " + brand + " - " + model);
        watch.setPrice(BigDecimal.valueOf(price));
        watch.setBrand(brand);
        watch.setModel(model);
        watch.setColor(color);
        watch.setMaterial(material);
        watch.setMovement(movement);
        watch.setWarranty(5);
        watch.setStock(stock);
        watch.setRating(4.5);
        watch.setReviews(10);
        // Use /images/ path — images are in public/images/ served as static files by Vite
        watch.setImageUrl("/images/watch" + imageCounter++ + ".png");
        watch.setActive(true);
        return watch;
    }
}

