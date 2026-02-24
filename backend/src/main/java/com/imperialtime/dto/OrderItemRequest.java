package com.imperialtime.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequest {
    private Long watchId;
    private String watchName;
    private Integer quantity;
    private java.math.BigDecimal price;
}
