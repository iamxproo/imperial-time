package com.imperialtime.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.imperialtime.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    
    List<Order> findByStatus(String status);
    
    List<Order> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'COMPLETED'")
    BigDecimal getTotalRevenue();
    
    @Query("SELECT COUNT(DISTINCT o.user.id) FROM Order o WHERE o.status = 'COMPLETED'")
    Long getUniqueCustomerCount();
}
