package com.umg.gastation.service;

import com.umg.gastation.entity.ReporteFinanciero;
import com.umg.gastation.repository.ReporteFinancieroRepository;
import com.umg.gastation.entity.VentaDiaria;
import com.umg.gastation.repository.VentaDiariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    @Autowired
    private VentaDiariaRepository ventaDiariaRepository;

    @Autowired
    private ReporteFinancieroRepository reporteFinancieroRepository;

    public List<VentaDiaria> generarReporteVentas(LocalDate fechaInicio, LocalDate fechaFin) {
        return ventaDiariaRepository.findAll().stream()
                .filter(venta -> !venta.getFecha().isBefore(fechaInicio) && !venta.getFecha().isAfter(fechaFin))
                .collect(Collectors.toList());
    }

    public ReporteFinanciero generarReporteFinanciero(LocalDate fechaInicio, LocalDate fechaFin) {
        // This is a simplified version. A real implementation would involve more complex calculations.
        double ingresosTotales = ventaDiariaRepository.findAll().stream()
                .filter(venta -> !venta.getFecha().isBefore(fechaInicio) && !venta.getFecha().isAfter(fechaFin))
                .mapToDouble(VentaDiaria::getTotalGeneral)
                .sum();

        // Costos and utilidad are not calculated here as the information is not available in the current entities.
        double costosTotales = 0;
        double utilidadBruta = ingresosTotales - costosTotales;

        ReporteFinanciero reporte = new ReporteFinanciero();
        reporte.setFechaInicio(fechaInicio);
        reporte.setFechaFin(fechaFin);
        reporte.setIngresosTotales(ingresosTotales);
        reporte.setCostosTotales(costosTotales);
        reporte.setUtilidadBruta(utilidadBruta);

        return reporteFinancieroRepository.save(reporte);
    }
}
