package com.mlbt.springweb.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.mlbt.springweb.model.Usuario;
import com.mlbt.springweb.repository.UsuarioRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void buscarPorIdRetornaUsuarioExistente() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Administrador MLBT");
        usuario.setCorreo("admin@example.com");
        usuario.setRol("Administrador");

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        Usuario resultado = usuarioService.buscarPorId(1L);

        assertSame(usuario, resultado);
        assertEquals("Administrador MLBT", resultado.getNombre());
    }

    @Test
    void buscarPorIdLanzaErrorCuandoNoExiste() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        IllegalArgumentException error = assertThrows(
                IllegalArgumentException.class,
                () -> usuarioService.buscarPorId(99L)
        );

        assertEquals("Usuario no encontrado", error.getMessage());
    }

    @Test
    void guardarDelegaPersistenciaEnRepositorio() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Mesero MLBT");
        usuario.setCorreo("mesero@example.com");
        usuario.setRol("Mesero");

        when(usuarioRepository.save(usuario)).thenReturn(usuario);

        Usuario resultado = usuarioService.guardar(usuario);

        assertSame(usuario, resultado);
        verify(usuarioRepository).save(usuario);
    }
}
