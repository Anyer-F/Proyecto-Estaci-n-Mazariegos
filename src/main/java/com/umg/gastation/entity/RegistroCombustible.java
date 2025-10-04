package com.umg.gastation.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "registro_combustible")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistroCombustible {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tanque_id", nullable = false)
    private Tanque tanque;

    private String tipoMovimiento; // "CARGA" o "DESPACHO"

    private double cantidad; // litros

    private LocalDateTime fecha = LocalDateTime.now();

    private String observacion;
}
