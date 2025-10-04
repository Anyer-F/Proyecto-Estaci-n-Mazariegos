package com.umg.gastation.service;

import com.umg.gastation.entity.RegistroCombustible;
import com.umg.gastation.entity.Tanque;
import com.umg.gastation.repository.RegistroCombustibleRepository;
import com.umg.gastation.repository.TanqueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CombustibleService {

    private final TanqueRepository tanqueRepository;
    private final RegistroCombustibleRepository registroRepo;

    @Transactional
    public Tanque registrarCarga(Long tanqueId, double cantidad) {
        Tanque tanque = tanqueRepository.findById(tanqueId)
                .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));

        if (tanque.getCantidadActual() + cantidad > tanque.getCapacidadMaxima()) {
            throw new RuntimeException("Capacidad del tanque excedida");
        }

        tanque.setCantidadActual(tanque.getCantidadActual() + cantidad);
        registroRepo.save(RegistroCombustible.builder()
                .tanque(tanque)
                .tipoMovimiento("CARGA")
                .cantidad(cantidad)
                .observacion("Carga de cisterna")
                .build());
        return tanqueRepository.save(tanque);
    }

    @Transactional
    public Tanque registrarDespacho(Long tanqueId, double cantidad) {
        Tanque tanque = tanqueRepository.findById(tanqueId)
                .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));

        if (tanque.getCantidadActual() < cantidad) {
            throw new RuntimeException("Combustible insuficiente en tanque");
        }

        tanque.setCantidadActual(tanque.getCantidadActual() - cantidad);
        registroRepo.save(RegistroCombustible.builder()
                .tanque(tanque)
                .tipoMovimiento("DESPACHO")
                .cantidad(cantidad)
                .observacion("Venta de combustible")
                .build());
        return tanqueRepository.save(tanque);
    }

    public List<Tanque> consultarNiveles() {
        return tanqueRepository.findAll();
    }

    public double conciliar(Long tanqueId) {
        List<RegistroCombustible> registros = registroRepo.findByTanqueId(tanqueId);
        double totalCargas = registros.stream()
                .filter(r -> r.getTipoMovimiento().equals("CARGA"))
                .mapToDouble(RegistroCombustible::getCantidad).sum();
        double totalDespachos = registros.stream()
                .filter(r -> r.getTipoMovimiento().equals("DESPACHO"))
                .mapToDouble(RegistroCombustible::getCantidad).sum();
        return totalCargas - totalDespachos;
    }
}
