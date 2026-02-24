package com.imperialtime.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {
    private Long userId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String shippingAddress;
    private String billingAddress;
    private String upiId;
    private java.math.BigDecimal subtotal;
    private java.math.BigDecimal tax;
    private java.math.BigDecimal totalAmount;
    private List<OrderItemRequest> items;
}
