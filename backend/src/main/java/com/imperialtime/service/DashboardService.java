package com.imperialtime.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imperialtime.dto.CustomerDTO;
import com.imperialtime.dto.DashboardResponse;
import com.imperialtime.dto.OrderDTO;
import com.imperialtime.dto.SalesPoint;
import com.imperialtime.model.Order;
import com.imperialtime.model.OrderItem;
import com.imperialtime.model.User;
import com.imperialtime.repository.OrderRepository;
import com.imperialtime.repository.UserRepository;

@Service
public class DashboardService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public DashboardResponse getDashboardData() {
        DashboardResponse dashboard = new DashboardResponse();
        
        // Calculate total revenue
        BigDecimal totalRevenue = orderRepository.getTotalRevenue();
        dashboard.setTotalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO);
        
        // Get total orders
        List<Order> allOrders = orderRepository.findAll();
        dashboard.setTotalOrders((long) allOrders.size());
        
        // Get unique customers
        Long uniqueCustomers = orderRepository.getUniqueCustomerCount();
        dashboard.setTotalCustomers(uniqueCustomers != null ? uniqueCustomers : 0L);
        
        // Calculate total watches sold
        Long totalWatches = allOrders.stream()
                .flatMap(o -> o.getItems().stream())
                .mapToLong(OrderItem::getQuantity)
                .sum();
        dashboard.setTotalWatchesSold(totalWatches);
        
        // Get recent orders (last 10)
        List<OrderDTO> recentOrders = allOrders.stream()
                .sorted((o1, o2) -> Long.compare(o2.getCreatedAt(), o1.getCreatedAt()))
                .limit(10)
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
        dashboard.setRecentOrders(recentOrders);
        
        // Get loyal customers (top 5 by spent)
        List<CustomerDTO> loyalCustomers = getLoyalCustomers(5);
        dashboard.setLoyalCustomers(loyalCustomers);
        
        return dashboard;
    }

    public List<SalesPoint> getWeeklySales(int weeksBack) {
    List<Order> completed = orderRepository.findByStatus("COMPLETED");
    // group by week number relative to now
    long millisPerWeek = 7L * 24 * 60 * 60 * 1000;
    long now = System.currentTimeMillis();
    return java.util.stream.IntStream.rangeClosed(0, weeksBack - 1)
        .mapToObj(i -> {
            long start = now - (i + 1) * millisPerWeek;
            long end = now - i * millisPerWeek;
            java.math.BigDecimal revenue = completed.stream()
                .filter(o -> o.getCreatedAt() >= start && o.getCreatedAt() < end)
                .map(Order::getTotalAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
            long orders = completed.stream()
                .filter(o -> o.getCreatedAt() >= start && o.getCreatedAt() < end)
                .count();
            return new SalesPoint("Week-" + (i + 1), revenue, orders);
        })
        .collect(java.util.stream.Collectors.toList());
    }

    public List<SalesPoint> getMonthlySales(int monthsBack) {
    List<Order> completed = orderRepository.findByStatus("COMPLETED");
    java.util.Calendar cal = java.util.Calendar.getInstance();
    return java.util.stream.IntStream.rangeClosed(0, monthsBack - 1)
        .mapToObj(i -> {
            java.util.Calendar startCal = (java.util.Calendar) cal.clone();
            startCal.add(java.util.Calendar.MONTH, -i - 1);
            startCal.set(java.util.Calendar.DAY_OF_MONTH, 1);
            startCal.set(java.util.Calendar.HOUR_OF_DAY, 0);
            startCal.set(java.util.Calendar.MINUTE, 0);
            startCal.set(java.util.Calendar.SECOND, 0);
            startCal.set(java.util.Calendar.MILLISECOND, 0);

            java.util.Calendar endCal = (java.util.Calendar) cal.clone();
            endCal.add(java.util.Calendar.MONTH, -i);
            endCal.set(java.util.Calendar.DAY_OF_MONTH, 1);
            endCal.set(java.util.Calendar.HOUR_OF_DAY, 0);
            endCal.set(java.util.Calendar.MINUTE, 0);
            endCal.set(java.util.Calendar.SECOND, 0);
            endCal.set(java.util.Calendar.MILLISECOND, 0);

            long start = startCal.getTimeInMillis();
            long end = endCal.getTimeInMillis();

            java.math.BigDecimal revenue = completed.stream()
                .filter(o -> o.getCreatedAt() >= start && o.getCreatedAt() < end)
                .map(Order::getTotalAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
            long orders = completed.stream()
                .filter(o -> o.getCreatedAt() >= start && o.getCreatedAt() < end)
                .count();
            String label = startCal.getDisplayName(java.util.Calendar.MONTH, java.util.Calendar.SHORT, java.util.Locale.getDefault()) + " " + startCal.get(java.util.Calendar.YEAR);
            return new SalesPoint(label, revenue, orders);
        })
        .collect(java.util.stream.Collectors.toList());
    }
    
    public List<CustomerDTO> getLoyalCustomers(int limit) {
        List<User> users = userRepository.findAll();
        
        return users.stream()
                .map(user -> {
                    List<Order> userOrders = orderRepository.findByUserId(user.getId());
                    
                    BigDecimal totalSpent = userOrders.stream()
                            .filter(o -> "COMPLETED".equals(o.getStatus()))
                            .map(Order::getTotalAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    
                    Long lastOrderDate = userOrders.stream()
                            .map(Order::getCreatedAt)
                            .max(Long::compareTo)
                            .orElse(0L);
                    
                    return new CustomerDTO(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        userOrders.size(),
                        totalSpent,
                        lastOrderDate
                    );
                })
                .filter(c -> c.getTotalOrders() > 0)
                .sorted((c1, c2) -> c2.getTotalSpent().compareTo(c1.getTotalSpent()))
                .limit(limit)
                .collect(Collectors.toList());
    }
    
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }
    
    public List<OrderDTO> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status).stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }
    
    public OrderDTO getOrderById(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        return order.map(this::convertToOrderDTO).orElse(null);
    }
    
    private OrderDTO convertToOrderDTO(Order order) {
        return new OrderDTO(
            order.getId(),
            order.getUser().getId(),
            order.getUser().getFirstName() + " " + order.getUser().getLastName(),
            order.getUser().getEmail(),
            order.getTotalAmount(),
            order.getStatus(),
            order.getCreatedAt(),
            order.getItems().size()
        );
    }
}
