package com.mlbt.service;

public class AuthService {

    // Credenciales controladas para evidencia local. No son autenticacion productiva.
    private static final String ADMIN_EMAIL = "admin@mlbt.com";
    private static final String ADMIN_PASSWORD = "admin123";

    public boolean isValidLogin(String email, String password) {
        String normalizedEmail = normalize(email).toLowerCase();
        String normalizedPassword = normalize(password);

        return ADMIN_EMAIL.equals(normalizedEmail) && ADMIN_PASSWORD.equals(normalizedPassword);
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }
}
