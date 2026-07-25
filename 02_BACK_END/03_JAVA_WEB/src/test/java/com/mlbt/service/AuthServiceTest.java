package com.mlbt.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class AuthServiceTest {

    private final AuthService authService = new AuthService();

    @Test
    void aceptaCredencialesControladasConEspaciosYMayusculas() {
        assertTrue(authService.isValidLogin(" ADMIN@MLBT.COM ", " admin123 "));
    }

    @Test
    void rechazaCredencialesInvalidas() {
        assertFalse(authService.isValidLogin("admin@mlbt.com", "claveIncorrecta"));
    }

    @Test
    void rechazaValoresNulosOVacios() {
        assertFalse(authService.isValidLogin(null, "admin123"));
        assertFalse(authService.isValidLogin("admin@mlbt.com", null));
        assertFalse(authService.isValidLogin("", ""));
    }
}
