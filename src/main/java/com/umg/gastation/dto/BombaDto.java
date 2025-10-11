package com.umg.gastation.dto;

import lombok.Data;

@Data
public class BombaDto {
    private Long id;
    private String numero;
    private String tipoCombustible;
    private Long tanqueId;
    private double totalDespachado;
}
