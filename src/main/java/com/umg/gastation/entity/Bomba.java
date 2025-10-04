package com.umg.gastation.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bombas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bomba {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo; // Identificador físico de la bomba

    @ManyToOne
    @JoinColumn(name = "tanque_id", nullable = false)
    private Tanque tanque;

    private double totalDespachado; // litros totales vendidos
}
