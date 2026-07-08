package com.mlbt.springweb.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventas")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El producto vendido es obligatorio")
    @Column(nullable = false, length = 120)
    private String producto;

    @Min(value = 1, message = "La cantidad debe ser mayor que cero")
    @Column(nullable = false)
    private Integer cantidad = 1;

    @DecimalMin(value = "0.01", inclusive = true, message = "El total debe ser mayor que cero")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;

    @Column(nullable = false)
    private LocalDateTime fecha = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public String getProducto() {
        return producto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
