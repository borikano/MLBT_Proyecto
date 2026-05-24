package com.mlbt.service;

import com.mlbt.model.User;
import com.mlbt.repository.InMemoryDataStore;
import java.util.List;

public class UserService {

    public List<User> findAll() {
        return InMemoryDataStore.getUsers();
    }

    public void create(String name, String email, String role) {
        InMemoryDataStore.addUser(normalize(name), normalize(email), normalize(role));
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }
}
