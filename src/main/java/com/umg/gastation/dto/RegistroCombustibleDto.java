package com.umg.gastation.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RegistroCombustibleDto {
    private Long id;
    private Long tanqueId;
    private String tipoOperacion;
    private double litros;
    private LocalDateTime fecha;
    private Long bombaId;
    private Long usuarioId;
}
