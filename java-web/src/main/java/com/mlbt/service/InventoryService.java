package com.mlbt.service;

import com.mlbt.model.InventoryItem;
import com.mlbt.repository.InMemoryDataStore;
import java.util.List;

public class InventoryService {

    public List<InventoryItem> findAll() {
        return InMemoryDataStore.getInventory();
    }

    public void create(String name, int stock) {
        InMemoryDataStore.addInventoryItem(normalize(name), stock);
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }
}
