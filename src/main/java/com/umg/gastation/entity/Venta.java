package com.umg.gastation.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoVenta; // "COMBUSTIBLE" o "PRODUCTO"

    private double montoTotal;

    private LocalDateTime fecha = LocalDateTime.now();

    private String descripcion;

    private String referencia; // ej: "Tanque 1" o "Producto: Aceite Castrol"
}
