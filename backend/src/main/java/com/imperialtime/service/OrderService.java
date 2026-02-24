package com.imperialtime.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imperialtime.dto.CreateOrderRequest;
import com.imperialtime.dto.OrderDTO;
import com.imperialtime.model.Order;
import com.imperialtime.model.OrderItem;
import com.imperialtime.model.User;
import com.imperialtime.model.Watch;
import com.imperialtime.repository.OrderRepository;
import com.imperialtime.repository.UserRepository;
import com.imperialtime.repository.WatchRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private WatchRepository watchRepository;
    
    public OrderDTO createOrder(CreateOrderRequest request) {
        // Get or create user
        User user;
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            // Create a new user if doesn't exist
            user = new User();
            String[] nameParts = request.getCustomerName().split(" ");
            user.setFirstName(nameParts[0]);
            user.setLastName(nameParts.length > 1 ? nameParts[1] : "");
            user.setEmail(request.getCustomerEmail());
            user.setPhoneNumber(request.getCustomerPhone());
            user.setAddress(request.getShippingAddress());
            user.setPassword(""); // Default empty password for new users created during checkout
            user = userRepository.save(user);
        }
        
        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setStatus("COMPLETED");
        order.setTotalAmount(request.getTotalAmount());
        order.setShippingAddress(request.getShippingAddress());
        order.setBillingAddress(request.getBillingAddress());
        order.setPaymentMethod("UPI - " + request.getUpiId());
        
        // Create order items
        List<OrderItem> orderItems = new ArrayList<>();
        request.getItems().forEach(item -> {
            Optional<Watch> watchOpt = watchRepository.findById(item.getWatchId());
            if (watchOpt.isPresent()) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setWatch(watchOpt.get());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setPriceAtOrdered(item.getPrice());
                orderItems.add(orderItem);
            }
        });
        
        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        
        return convertToOrderDTO(savedOrder);
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
