package com.umg.gastation.controller;

import com.umg.gastation.entity.Producto;
import com.umg.gastation.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // CU03 – Registrar entrada
    @PostMapping("/entrada")
    public Producto registrarEntrada(@RequestParam Long id, @RequestParam int cantidad) {
        return productoService.registrarEntrada(id, cantidad);
    }

    // CU04 – Registrar salida
    @PostMapping("/salida")
    public Producto registrarSalida(@RequestParam Long id, @RequestParam int cantidad) {
        return productoService.registrarSalida(id, cantidad);
    }

    // CU05 – Consultar existencias
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.obtenerTodos();
    }

    // CU06 – Alertas de stock bajo
    @GetMapping("/alertas")
    public List<Producto> obtenerAlertasStock() {
        return productoService.obtenerStockBajo();
    }
}
