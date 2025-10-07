package com.umg.gastation.controller;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @PostMapping("/entrada")
    public ResponseEntity<ProductoDTO> registrarEntrada(@RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.registrarEntrada(dto));
    }

    @PostMapping("/salida")
    public ResponseEntity<ProductoDTO> registrarSalida(@RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.registrarSalida(dto));
    }
}

