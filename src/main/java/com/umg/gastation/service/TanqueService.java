package com.umg.gastation.service;

import com.umg.gastation.entity.Tanque;
import com.umg.gastation.repository.TanqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TanqueService {

    @Autowired
    private TanqueRepository tanqueRepository;

    @Transactional
    public Tanque registrarCarga(Long id, double litros) {
        Tanque tanque = tanqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));
        if (tanque.getNivelActual() + litros > tanque.getCapacidad()) {
            throw new RuntimeException("La carga excede la capacidad del tanque");
        }
        tanque.setNivelActual(tanque.getNivelActual() + litros);
        return tanqueRepository.save(tanque);
    }

    @Transactional
    public Tanque registrarDespacho(Long id, double litros) {
        Tanque tanque = tanqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));
        if (tanque.getNivelActual() < litros) {
            throw new RuntimeException("No hay suficiente combustible para el despacho");
        }
        tanque.setNivelActual(tanque.getNivelActual() - litros);
        return tanqueRepository.save(tanque);
    }

    public String conciliarCombustible(Long id) {
        Tanque tanque = tanqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));
        // Lógica de conciliación (ejemplo simple)
        return String.format("Conciliación para Tanque %d: Nivel Actual %.2fL, Capacidad %.2fL",
                tanque.getId(), tanque.getNivelActual(), tanque.getCapacidad());
    }

    public List<Tanque> obtenerTodos() {
        return tanqueRepository.findAll();
    }

    public Tanque getTanqueById(Long id) {
        return tanqueRepository.findById(id).orElse(null);
    }

    @Transactional
    public Tanque createTanque(Tanque tanque) {
        return tanqueRepository.save(tanque);
    }

    @Transactional
    public Tanque updateTanque(Long id, Tanque tanque) {
        Tanque existingTanque = tanqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));
        existingTanque.setTipoCombustible(tanque.getTipoCombustible());
        existingTanque.setCapacidad(tanque.getCapacidad());
        existingTanque.setNivelActual(tanque.getNivelActual());
        return tanqueRepository.save(existingTanque);
    }

    @Transactional
    public void deleteTanque(Long id) {
        tanqueRepository.deleteById(id);
    }
}

