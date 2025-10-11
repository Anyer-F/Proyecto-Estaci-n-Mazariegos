package com.umg.gastation.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MovimientoInventarioDto {
    private Long id;
    private Long productoId;
    private String tipoMovimiento;
    private double cantidad;
    private LocalDateTime fecha;
    private Long usuarioId;
}
