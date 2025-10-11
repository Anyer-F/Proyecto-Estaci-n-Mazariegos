package com.umg.gastation.dto;

import lombok.Data;

@Data
public class ProductoDto {
    private Long id;
    private String nombre;
    private String tipo;
    private String unidadMedida;
    private double cantidadActual;
    private double precioUnitario;
    private double stockMinimo;
}
