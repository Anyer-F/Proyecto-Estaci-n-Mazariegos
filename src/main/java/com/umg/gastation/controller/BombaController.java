package com.umg.gastation.controller;

import com.umg.gastation.dto.BombaDto;
import com.umg.gastation.entity.Bomba;
import com.umg.gastation.entity.Tanque;
import com.umg.gastation.repository.TanqueRepository;
import com.umg.gastation.service.BombaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bombas")
public class BombaController {

    @Autowired
    private BombaService bombaService;

    @Autowired
    private TanqueRepository tanqueRepository;

    private BombaDto convertToDto(Bomba bomba) {
        BombaDto bombaDto = new BombaDto();
        bombaDto.setId(bomba.getId());
        bombaDto.setNumero(bomba.getNumero());
        bombaDto.setTipoCombustible(bomba.getTipoCombustible());
        if (bomba.getTanque() != null) {
            bombaDto.setTanqueId(bomba.getTanque().getId());
        }
        bombaDto.setTotalDespachado(bomba.getTotalDespachado());
        return bombaDto;
    }

    private Bomba convertToEntity(BombaDto bombaDto) {
        Bomba bomba = new Bomba();
        bomba.setId(bombaDto.getId());
        bomba.setNumero(bombaDto.getNumero());
        bomba.setTipoCombustible(bombaDto.getTipoCombustible());
        bomba.setTotalDespachado(bombaDto.getTotalDespachado());
        if (bombaDto.getTanqueId() != null) {
            Tanque tanque = tanqueRepository.findById(bombaDto.getTanqueId())
                    .orElseThrow(() -> new RuntimeException("Tanque no encontrado"));
            bomba.setTanque(tanque);
        }
        return bomba;
    }

    @GetMapping
    public List<BombaDto> getAllBombas() {
        return bombaService.getAllBombas().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BombaDto> getBombaById(@PathVariable Long id) {
        Bomba bomba = bombaService.getBombaById(id);
        return bomba != null ? ResponseEntity.ok(convertToDto(bomba)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public BombaDto createBomba(@RequestBody BombaDto bombaDto) {
        Bomba bomba = convertToEntity(bombaDto);
        return convertToDto(bombaService.createBomba(bomba));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BombaDto> updateBomba(@PathVariable Long id, @RequestBody BombaDto bombaDto) {
        Bomba bomba = convertToEntity(bombaDto);
        return ResponseEntity.ok(convertToDto(bombaService.updateBomba(id, bomba)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBomba(@PathVariable Long id) {
        bombaService.deleteBomba(id);
        return ResponseEntity.noContent().build();
    }
}