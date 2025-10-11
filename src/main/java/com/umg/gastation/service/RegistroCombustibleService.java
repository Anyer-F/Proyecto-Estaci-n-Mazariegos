package com.umg.gastation.service;

import com.umg.gastation.entity.RegistroCombustible;
import com.umg.gastation.repository.RegistroCombustibleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RegistroCombustibleService {

    @Autowired
    private RegistroCombustibleRepository registroCombustibleRepository;

    public List<RegistroCombustible> getAllRegistros() {
        return registroCombustibleRepository.findAll();
    }

    public RegistroCombustible getRegistroById(Long id) {
        return registroCombustibleRepository.findById(id).orElse(null);
    }

    @Transactional
    public RegistroCombustible createRegistro(RegistroCombustible registro) {
        return registroCombustibleRepository.save(registro);
    }
}
