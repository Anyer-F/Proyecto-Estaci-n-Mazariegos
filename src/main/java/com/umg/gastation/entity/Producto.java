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
    private Long id;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MovimientoInventario> movimientos;

    private String nombre;

    private String tipo;

    private String unidadMedida; // litros, frascos, cajas, etc.

    private double cantidadActual; // existencias

    private double precioUnitario;

    private double stockMinimo; // para generar alerta de stock bajo
}
