package com.umg.gastation.dto;

import lombok.Data;

@Data
public class TanqueDto {
    private Long id;
    private String tipoCombustible;
    private double capacidad;
    private double nivelActual;
}
