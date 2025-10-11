package com.umg.gastation.controller;

import com.umg.gastation.dto.VentaDiariaDto;
import com.umg.gastation.entity.Usuario;
import com.umg.gastation.entity.VentaDiaria;
import com.umg.gastation.repository.UsuarioRepository;
import com.umg.gastation.service.VentaDiariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/ventas-diarias")
public class VentaDiariaController {

    @Autowired
    private VentaDiariaService ventaDiariaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private VentaDiariaDto convertToDto(VentaDiaria venta) {
        VentaDiariaDto dto = new VentaDiariaDto();
        dto.setId(venta.getId());
        dto.setFecha(venta.getFecha());
        dto.setTotalCombustibles(venta.getTotalCombustibles());
        dto.setTotalProductos(venta.getTotalProductos());
        dto.setTotalGeneral(venta.getTotalGeneral());
        if (venta.getUsuario() != null) {
            dto.setUsuarioId(venta.getUsuario().getId());
        }
        return dto;
    }

    private VentaDiaria convertToEntity(VentaDiariaDto dto) {
        VentaDiaria venta = new VentaDiaria();
        venta.setId(dto.getId());
        venta.setFecha(dto.getFecha());
        venta.setTotalCombustibles(dto.getTotalCombustibles());
        venta.setTotalProductos(dto.getTotalProductos());
        venta.setTotalGeneral(dto.getTotalGeneral());
        if (dto.getUsuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            venta.setUsuario(usuario);
        }
        return venta;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<VentaDiariaDto> getAllVentas() {
        return ventaDiariaService.getAllVentas().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VentaDiariaDto> getVentaById(@PathVariable Long id) {
        VentaDiaria venta = ventaDiariaService.getVentaById(id);
        return venta != null ? ResponseEntity.ok(convertToDto(venta)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('DESPACHADOR')")
    public VentaDiariaDto createVenta(@RequestBody VentaDiariaDto dto) {
        VentaDiaria venta = convertToEntity(dto);
        return convertToDto(ventaDiariaService.createVenta(venta));
    }
}
