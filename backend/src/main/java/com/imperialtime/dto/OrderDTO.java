package com.imperialtime.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long userId;
    private String customerName;
    private String customerEmail;
    private BigDecimal totalAmount;
    private String status;
    private Long createdAt;
    private Integer itemCount;
}
