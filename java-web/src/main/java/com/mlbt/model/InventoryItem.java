package com.mlbt.model;

public class InventoryItem {

    private final int id;
    private final String name;
    private final int stock;

    public InventoryItem(int id, String name, int stock) {
        this.id = id;
        this.name = name;
        this.stock = stock;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getStock() {
        return stock;
    }
}
