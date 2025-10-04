package com.umg.gastation.service;

import com.umg.gastation.entity.MovimientoInventario;
import com.umg.gastation.entity.Producto;
import com.umg.gastation.repository.MovimientoInventarioRepository;
import com.umg.gastation.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final MovimientoInventarioRepository movimientoRepo;

    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @Transactional
    public Producto registrarEntrada(Long productoId, double cantidad, String descripcion) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setCantidad(producto.getCantidad() + cantidad);
        productoRepository.save(producto);

        movimientoRepo.save(MovimientoInventario.builder()
                .producto(producto)
                .tipo("ENTRADA")
                .cantidad(cantidad)
                .descripcion(descripcion)
                .build());

        return producto;
    }

    @Transactional
    public Producto registrarSalida(Long productoId, double cantidad, String descripcion) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (producto.getCantidad() < cantidad) {
            throw new RuntimeException("Stock insuficiente para esta salida");
        }

        producto.setCantidad(producto.getCantidad() - cantidad);
        productoRepository.save(producto);

        movimientoRepo.save(MovimientoInventario.builder()
                .producto(producto)
                .tipo("SALIDA")
                .cantidad(cantidad)
                .descripcion(descripcion)
                .build());

        return producto;
    }

    public List<Producto> productosConStockBajo() {
        return productoRepository.findByCantidadLessThan(5); // o stockMinimo
    }
}
