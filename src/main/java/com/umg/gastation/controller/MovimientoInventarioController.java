package com.umg.gastation.controller;

import com.umg.gastation.dto.MovimientoInventarioDto;
import com.umg.gastation.entity.MovimientoInventario;
import com.umg.gastation.entity.Producto;
import com.umg.gastation.entity.Usuario;
import com.umg.gastation.repository.ProductoRepository;
import com.umg.gastation.repository.UsuarioRepository;
import com.umg.gastation.service.MovimientoInventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movimientos-inventario")
public class MovimientoInventarioController {

    @Autowired
    private MovimientoInventarioService movimientoInventarioService;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private MovimientoInventarioDto convertToDto(MovimientoInventario movimiento) {
        MovimientoInventarioDto dto = new MovimientoInventarioDto();
        dto.setId(movimiento.getId());
        if (movimiento.getProducto() != null) {
            dto.setProductoId(movimiento.getProducto().getId());
        }
        dto.setTipoMovimiento(movimiento.getTipoMovimiento());
        dto.setCantidad(movimiento.getCantidad());
        dto.setFecha(movimiento.getFecha());
        if (movimiento.getUsuario() != null) {
            dto.setUsuarioId(movimiento.getUsuario().getId());
        }
        return dto;
    }

    private MovimientoInventario convertToEntity(MovimientoInventarioDto dto) {
        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setId(dto.getId());
        if (dto.getProductoId() != null) {
            Producto producto = productoRepository.findById(dto.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            movimiento.setProducto(producto);
        }
        movimiento.setTipoMovimiento(dto.getTipoMovimiento());
        movimiento.setCantidad(dto.getCantidad());
        movimiento.setFecha(dto.getFecha());
        if (dto.getUsuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            movimiento.setUsuario(usuario);
        }
        return movimiento;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<MovimientoInventarioDto> getAllMovimientos() {
        return movimientoInventarioService.getAllMovimientos().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MovimientoInventarioDto> getMovimientoById(@PathVariable Long id) {
        MovimientoInventario movimiento = movimientoInventarioService.getMovimientoById(id);
        return movimiento != null ? ResponseEntity.ok(convertToDto(movimiento)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('DESPACHADOR')")
    public MovimientoInventarioDto createMovimiento(@RequestBody MovimientoInventarioDto dto) {
        MovimientoInventario movimiento = convertToEntity(dto);
        return convertToDto(movimientoInventarioService.createMovimiento(movimiento));
    }
}
