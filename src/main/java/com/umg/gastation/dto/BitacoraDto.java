package com.umg.gastation.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BitacoraDto {
    private Long id;
    private LocalDateTime fecha;
    private Long usuarioId;
    private String modulo;
    private String accion;
    private String descripcion;
}
