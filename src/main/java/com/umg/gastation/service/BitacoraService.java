package com.umg.gastation.service;

import com.umg.gastation.entity.Bitacora;
import com.umg.gastation.repository.BitacoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BitacoraService {

    @Autowired
    private BitacoraRepository bitacoraRepository;

    public List<Bitacora> getAllBitacora() {
        return bitacoraRepository.findAll();
    }

    public void saveBitacora(Bitacora bitacora) {
        bitacoraRepository.save(bitacora);
    }
}
