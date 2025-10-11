package com.umg.gastation.service;

import com.umg.gastation.entity.Producto;
import com.umg.gastation.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    public Producto registrarEntrada(Long id, int cantidad) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setCantidadActual(producto.getCantidadActual() + cantidad);
        return productoRepository.save(producto);
    }

    @Transactional
    public Producto registrarSalida(Long id, int cantidad) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        double nuevaCantidad = producto.getCantidadActual() - cantidad;
        if (nuevaCantidad < 0) {
            throw new RuntimeException("No hay suficiente stock para registrar la salida");
        }
        producto.setCantidadActual(nuevaCantidad);
        return productoRepository.save(producto);
    }

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public List<Producto> obtenerStockBajo() {
        return productoRepository.findByCantidadActualLessThanEqualStockMinimo();
    }

    public Producto getProductoById(Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    @Transactional
    public Producto createProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    @Transactional
    public Producto updateProducto(Long id, Producto producto) {
        Producto existingProducto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        existingProducto.setNombre(producto.getNombre());
        existingProducto.setTipo(producto.getTipo());
        existingProducto.setUnidadMedida(producto.getUnidadMedida());
        existingProducto.setCantidadActual(producto.getCantidadActual());
        existingProducto.setPrecioUnitario(producto.getPrecioUnitario());
        existingProducto.setStockMinimo(producto.getStockMinimo());
        return productoRepository.save(existingProducto);
    }

    @Transactional
    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
}