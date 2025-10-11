package com.umg.gastation.service;

import com.umg.gastation.entity.MovimientoInventario;
import com.umg.gastation.repository.MovimientoInventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MovimientoInventarioService {

    @Autowired
    private MovimientoInventarioRepository movimientoInventarioRepository;

    public List<MovimientoInventario> getAllMovimientos() {
        return movimientoInventarioRepository.findAll();
    }

    public MovimientoInventario getMovimientoById(Long id) {
        return movimientoInventarioRepository.findById(id).orElse(null);
    }

    @Transactional
    public MovimientoInventario createMovimiento(MovimientoInventario movimiento) {
        return movimientoInventarioRepository.save(movimiento);
    }
}
