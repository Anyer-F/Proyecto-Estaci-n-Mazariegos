package com.umg.gastation.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class VentaDiariaDto {
    private Long id;
    private LocalDate fecha;
    private double totalCombustibles;
    private double totalProductos;
    private double totalGeneral;
    private Long usuarioId;
}
