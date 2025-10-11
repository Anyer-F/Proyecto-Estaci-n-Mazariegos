package com.umg.gastation.controller;

import com.umg.gastation.dto.RegistroCombustibleDto;
import com.umg.gastation.entity.Bomba;
import com.umg.gastation.entity.RegistroCombustible;
import com.umg.gastation.entity.Tanque;
import com.umg.gastation.entity.Usuario;
import com.umg.gastation.repository.BombaRepository;
import com.umg.gastation.repository.TanqueRepository;
import com.umg.gastation.repository.UsuarioRepository;
import com.umg.gastation.service.RegistroCombustibleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/registros-combustible")
public class RegistroCombustibleController {

    @Autowired
    private RegistroCombustibleService registroCombustibleService;

    @Autowired
    private TanqueRepository tanqueRepository;

    @Autowired
    private BombaRepository bombaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private RegistroCombustibleDto convertToDto(RegistroCombustible registro) {
        RegistroCombustibleDto dto = new RegistroCombustibleDto();
        dto.setId(registro.getId());
        if (registro.getTanque() != null) {
            dto.setTanqueId(registro.getTanque().getId());
        }
        dto.setTipoOperacion(registro.getTipoOperacion());
        dto.setLitros(registro.getLitros());
        dto.setFecha(registro.getFecha());
        if (registro.getBomba() != null) {
            dto.setBombaId(registro.getBomba().getId());
        }
        if (registro.getUsuario() != null) {
            dto.setUsuarioId(registro.getUsuario().getId());
        }
        return dto;
    }

    private RegistroCombustible convertToEntity(RegistroCombustibleDto dto) {
        RegistroCombustible registro = new RegistroCombustible();
        registro.setId(dto.getId());
        if (dto.getTanqueId() != null) {
            Tanque tanque = tanqueRepository.findById(dto.getTanqueId())
                    .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));
            registro.setTanque(tanque);
        }
        registro.setTipoOperacion(dto.getTipoOperacion());
        registro.setLitros(dto.getLitros());
        registro.setFecha(dto.getFecha());
        if (dto.getBombaId() != null) {
            Bomba bomba = bombaRepository.findById(dto.getBombaId())
                    .orElseThrow(() -> new RuntimeException("Bomba no encontrada"));
            registro.setBomba(bomba);
        }
        if (dto.getUsuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            registro.setUsuario(usuario);
        }
        return registro;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<RegistroCombustibleDto> getAllRegistros() {
        return registroCombustibleService.getAllRegistros().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RegistroCombustibleDto> getRegistroById(@PathVariable Long id) {
        RegistroCombustible registro = registroCombustibleService.getRegistroById(id);
        return registro != null ? ResponseEntity.ok(convertToDto(registro)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('DESPACHADOR')")
    public RegistroCombustibleDto createRegistro(@RequestBody RegistroCombustibleDto dto) {
        RegistroCombustible registro = convertToEntity(dto);
        return convertToDto(registroCombustibleService.createRegistro(registro));
    }
}
