package com.umg.gastation.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MovimientoInventario> movimientos;

    private Long id;

    private String nombre;

    private String unidadMedida; // litros, frascos, cajas, etc.

    private double cantidad; // existencias

    private double precioUnitario;

    private double stockMinimo; // para generar alerta de stock bajo
}
