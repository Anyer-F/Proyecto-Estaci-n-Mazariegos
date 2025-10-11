package com.umg.gastation.controller;

import com.umg.gastation.entity.Tanque;
import com.umg.gastation.service.TanqueService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tanques")
public class TanqueController {

    private final TanqueService tanqueService;

    public TanqueController(TanqueService tanqueService) {
        this.tanqueService = tanqueService;
    }

    // CU07 – Registrar carga
    @PostMapping("/carga")
    public Tanque registrarCarga(@RequestParam Long id, @RequestParam double litros) {
        return tanqueService.registrarCarga(id, litros);
    }

    // CU08 – Registrar despacho
    @PostMapping("/despacho")
    public Tanque registrarDespacho(@RequestParam Long id, @RequestParam double litros) {
        return tanqueService.registrarDespacho(id, litros);
    }

    // CU09 – Conciliar combustible
    @GetMapping("/conciliar/{id}")
    public String conciliarCombustible(@PathVariable Long id) {
        return tanqueService.conciliarCombustible(id);
    }

    // CU10 – Consultar niveles
    @GetMapping
    public List<Tanque> obtenerNiveles() {
        return tanqueService.obtenerTodos();
    }
}