package com.mlbt.springweb.service;

import com.mlbt.springweb.model.Venta;
import com.mlbt.springweb.repository.VentaRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }

    public List<Venta> listar() {
        return ventaRepository.findAll();
    }

    public Venta buscarPorId(Long id) {
        return ventaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venta no encontrada"));
    }

    @Transactional
    public Venta guardar(Venta venta) {
        return ventaRepository.save(venta);
    }

    @Transactional
    public void eliminar(Long id) {
        ventaRepository.deleteById(id);
    }
}
