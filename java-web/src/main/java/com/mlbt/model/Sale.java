package com.mlbt.model;

public class Sale {

    private final int id;
    private final String productName;
    private final int quantity;
    private final double total;

    public Sale(int id, String productName, int quantity, double total) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.total = total;
    }

    public int getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getTotal() {
        return total;
    }
}
