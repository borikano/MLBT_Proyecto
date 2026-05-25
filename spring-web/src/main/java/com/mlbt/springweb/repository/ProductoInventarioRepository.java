package com.mlbt.springweb.repository;

import com.mlbt.springweb.model.ProductoInventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoInventarioRepository extends JpaRepository<ProductoInventario, Long> {
}
