package com.umg.gastation.repository;

import com.umg.gastation.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    @Query("SELECT p FROM Producto p WHERE p.cantidadActual <= p.stockMinimo")
    List<Producto> findByCantidadActualLessThanEqualStockMinimo();
}
