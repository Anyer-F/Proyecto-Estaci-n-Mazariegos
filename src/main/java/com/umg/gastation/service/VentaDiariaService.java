package com.umg.gastation.service;

import com.umg.gastation.entity.VentaDiaria;
import com.umg.gastation.repository.VentaDiariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VentaDiariaService {

    @Autowired
    private VentaDiariaRepository ventaDiariaRepository;

    public List<VentaDiaria> getAllVentas() {
        return ventaDiariaRepository.findAll();
    }

    public VentaDiaria getVentaById(Long id) {
        return ventaDiariaRepository.findById(id).orElse(null);
    }

    @Transactional
    public VentaDiaria createVenta(VentaDiaria venta) {
        return ventaDiariaRepository.save(venta);
    }
}
