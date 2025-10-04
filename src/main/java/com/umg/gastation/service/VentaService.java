package com.umg.gastation.service;

import com.umg.gastation.entity.Venta;
import com.umg.gastation.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaService {

    private final VentaRepository ventaRepository;

    @Transactional
    public Venta registrarVenta(Venta venta) {
        return ventaRepository.save(venta);
    }

    public List<Venta> ventasEntreFechas(LocalDateTime inicio, LocalDateTime fin) {
        return ventaRepository.findByFechaBetween(inicio, fin);
    }

    public double calcularIngresos(LocalDateTime inicio, LocalDateTime fin) {
        return ventasEntreFechas(inicio, fin).stream()
                .mapToDouble(Venta::getMontoTotal)
                .sum();
    }
}
