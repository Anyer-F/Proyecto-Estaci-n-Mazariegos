package com.umg.gastation.service;

import com.umg.gastation.entity.Bomba;
import com.umg.gastation.repository.BombaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BombaService {

    @Autowired
    private BombaRepository bombaRepository;

    public List<Bomba> getAllBombas() {
        return bombaRepository.findAll();
    }

    public Bomba getBombaById(Long id) {
        return bombaRepository.findById(id).orElse(null);
    }

    @Transactional
    public Bomba createBomba(Bomba bomba) {
        return bombaRepository.save(bomba);
    }

    @Transactional
    public Bomba updateBomba(Long id, Bomba bomba) {
        Bomba existingBomba = bombaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bomba no encontrada"));
        existingBomba.setNumero(bomba.getNumero());
        existingBomba.setTipoCombustible(bomba.getTipoCombustible());
        existingBomba.setTanque(bomba.getTanque());
        existingBomba.setTotalDespachado(bomba.getTotalDespachado());
        return bombaRepository.save(existingBomba);
    }

    @Transactional
    public void deleteBomba(Long id) {
        bombaRepository.deleteById(id);
    }
}
