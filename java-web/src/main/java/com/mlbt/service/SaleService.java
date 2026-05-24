package com.mlbt.service;

import com.mlbt.model.Sale;
import com.mlbt.repository.InMemoryDataStore;
import java.util.List;

public class SaleService {

    public List<Sale> findAll() {
        return InMemoryDataStore.getSales();
    }

    public void create(String productName, int quantity, double total) {
        InMemoryDataStore.addSale(normalize(productName), quantity, total);
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }
}
