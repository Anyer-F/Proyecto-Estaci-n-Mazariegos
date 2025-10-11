package com.umg.gastation.controller;

import com.umg.gastation.dto.BitacoraDto;
import com.umg.gastation.entity.Bitacora;
import com.umg.gastation.service.BitacoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bitacora")
public class BitacoraController {

    @Autowired
    private BitacoraService bitacoraService;

    private BitacoraDto convertToDto(Bitacora bitacora) {
        BitacoraDto dto = new BitacoraDto();
        dto.setId(bitacora.getId());
        dto.setFecha(bitacora.getFecha());
        if (bitacora.getUsuario() != null) {
            dto.setUsuarioId(bitacora.getUsuario().getId());
        }
        dto.setModulo(bitacora.getModulo());
        dto.setAccion(bitacora.getAccion());
        dto.setDescripcion(bitacora.getDescripcion());
        return dto;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<BitacoraDto> getAllBitacora() {
        return bitacoraService.getAllBitacora().stream().map(this::convertToDto).collect(Collectors.toList());
    }
}
