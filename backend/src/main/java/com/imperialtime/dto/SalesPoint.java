package com.imperialtime.dto;

import java.math.BigDecimal;

public class SalesPoint {
    private String period;
    private BigDecimal totalRevenue;
    private Long totalOrders;

    public SalesPoint() {}

    public SalesPoint(String period, BigDecimal totalRevenue, Long totalOrders) {
        this.period = period;
        this.totalRevenue = totalRevenue;
        this.totalOrders = totalOrders;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }
}
