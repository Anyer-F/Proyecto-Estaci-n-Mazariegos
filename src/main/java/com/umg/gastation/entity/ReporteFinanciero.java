package com.umg.gastation.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "reportes_financieros")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReporteFinanciero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private double ingresosTotales;

    private double costosTotales;

    private double utilidadBruta;
}