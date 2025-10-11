package com.umg.gastation.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tanques")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tanque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "tanque", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bomba> bombas;

    @OneToMany(mappedBy = "tanque", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegistroCombustible> registros;

    private String tipoCombustible; // "Diesel", "Gasolina Regular", "Gasolina Súper"

    private double capacidad; // en litros

    private double nivelActual; // en litros
}
