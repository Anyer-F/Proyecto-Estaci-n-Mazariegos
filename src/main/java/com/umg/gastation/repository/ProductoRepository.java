package com.umg.gastation.repository;

import com.umg.gastation.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByCantidadLessThan(double cantidad);

    boolean existsByNombre(String nombre);
}
