package com.mlbt.repository;

import com.mlbt.model.InventoryItem;
import com.mlbt.model.Sale;
import com.mlbt.model.User;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public final class InMemoryDataStore {

    private static final AtomicInteger USER_SEQUENCE = new AtomicInteger(1);
    private static final AtomicInteger INVENTORY_SEQUENCE = new AtomicInteger(1);
    private static final AtomicInteger SALE_SEQUENCE = new AtomicInteger(1);

    private static final List<User> USERS = Collections.synchronizedList(new ArrayList<>());
    private static final List<InventoryItem> INVENTORY = Collections.synchronizedList(new ArrayList<>());
    private static final List<Sale> SALES = Collections.synchronizedList(new ArrayList<>());

    static {
        USERS.add(new User(USER_SEQUENCE.getAndIncrement(), "Administrador MLBT", "admin@mlbt.com", "Administrador del sistema"));
        INVENTORY.add(new InventoryItem(INVENTORY_SEQUENCE.getAndIncrement(), "Tortilla de maiz", 120));
        INVENTORY.add(new InventoryItem(INVENTORY_SEQUENCE.getAndIncrement(), "Carne al pastor", 35));
        SALES.add(new Sale(SALE_SEQUENCE.getAndIncrement(), "Orden de tacos", 2, 24000));
    }

    private InMemoryDataStore() {
    }

    public static List<User> getUsers() {
        return new ArrayList<>(USERS);
    }

    public static void addUser(String name, String email, String role) {
        USERS.add(new User(USER_SEQUENCE.getAndIncrement(), name, email, role));
    }

    public static List<InventoryItem> getInventory() {
        return new ArrayList<>(INVENTORY);
    }

    public static void addInventoryItem(String name, int stock) {
        INVENTORY.add(new InventoryItem(INVENTORY_SEQUENCE.getAndIncrement(), name, stock));
    }

    public static List<Sale> getSales() {
        return new ArrayList<>(SALES);
    }

    public static void addSale(String productName, int quantity, double total) {
        SALES.add(new Sale(SALE_SEQUENCE.getAndIncrement(), productName, quantity, total));
    }
}
