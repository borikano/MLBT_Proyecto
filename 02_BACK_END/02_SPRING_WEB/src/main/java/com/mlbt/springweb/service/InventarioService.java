package com.mlbt.springweb.service;

import com.mlbt.springweb.model.ProductoInventario;
import com.mlbt.springweb.repository.ProductoInventarioRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventarioService {

    private final ProductoInventarioRepository productoRepository;

    public InventarioService(ProductoInventarioRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<ProductoInventario> listar() {
        return productoRepository.findAll();
    }

    public ProductoInventario buscarPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    }

    @Transactional
    public ProductoInventario guardar(ProductoInventario producto) {
        return productoRepository.save(producto);
    }

    @Transactional
    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }
}
