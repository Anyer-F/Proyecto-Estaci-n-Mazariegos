package com.umg.gastation.controller;

import com.umg.gastation.dto.VentaDiariaDto;
import com.umg.gastation.entity.ReporteFinanciero;
import com.umg.gastation.entity.VentaDiaria;
import com.umg.gastation.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reportes")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/ventas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<VentaDiariaDto>> generarReporteVentas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        List<VentaDiaria> ventas = reporteService.generarReporteVentas(fechaInicio, fechaFin);
        List<VentaDiariaDto> dtos = ventas.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/financiero")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReporteFinanciero> generarReporteFinanciero(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        ReporteFinanciero reporte = reporteService.generarReporteFinanciero(fechaInicio, fechaFin);
        return ResponseEntity.ok(reporte);
    }

    private VentaDiariaDto convertToDto(VentaDiaria venta) {
        VentaDiariaDto dto = new VentaDiariaDto();
        dto.setId(venta.getId());
        dto.setFecha(venta.getFecha());
        dto.setTotalCombustibles(venta.getTotalCombustibles());
        dto.setTotalProductos(venta.getTotalProductos());
        dto.setTotalGeneral(venta.getTotalGeneral());
        if (venta.getUsuario() != null) {
            dto.setUsuarioId(venta.getUsuario().getId());
        }
        return dto;
    }
}
