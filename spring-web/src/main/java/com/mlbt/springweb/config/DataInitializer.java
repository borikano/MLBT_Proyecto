package com.mlbt.springweb.config;

import com.mlbt.springweb.model.ProductoInventario;
import com.mlbt.springweb.model.Usuario;
import com.mlbt.springweb.model.Venta;
import com.mlbt.springweb.repository.ProductoInventarioRepository;
import com.mlbt.springweb.repository.UsuarioRepository;
import com.mlbt.springweb.repository.VentaRepository;
import java.math.BigDecimal;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            UsuarioRepository usuarioRepository,
            ProductoInventarioRepository productoRepository,
            VentaRepository ventaRepository) {

        return args -> {
            if (usuarioRepository.count() == 0) {
                Usuario admin = new Usuario();
                admin.setNombre("Administrador MLBT");
                admin.setCorreo("admin@mlbt.com");
                admin.setRol("Administrador del sistema");
                admin.setActivo(true);
                usuarioRepository.save(admin);

                Usuario mesero = new Usuario();
                mesero.setNombre("Usuario Mesero");
                mesero.setCorreo("mesero@mlbt.com");
                mesero.setRol("Mesero");
                mesero.setActivo(true);
                usuarioRepository.save(mesero);
            }

            if (productoRepository.count() == 0) {
                ProductoInventario tortilla = new ProductoInventario();
                tortilla.setNombre("Tortilla de maiz");
                tortilla.setStock(120);
                tortilla.setUnidad("paquete");
                tortilla.setActivo(true);
                productoRepository.save(tortilla);

                ProductoInventario pastor = new ProductoInventario();
                pastor.setNombre("Carne al pastor");
                pastor.setStock(35);
                pastor.setUnidad("kilo");
                pastor.setActivo(true);
                productoRepository.save(pastor);

                ProductoInventario salsa = new ProductoInventario();
                salsa.setNombre("Salsa roja");
                salsa.setStock(20);
                salsa.setUnidad("litro");
                salsa.setActivo(true);
                productoRepository.save(salsa);
            }

            if (ventaRepository.count() == 0) {
                Venta venta = new Venta();
                venta.setProducto("Orden de tacos");
                venta.setCantidad(2);
                venta.setTotal(new BigDecimal("24000.00"));
                ventaRepository.save(venta);
            }
        };
    }
}
