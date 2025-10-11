package com.umg.gastation.repository;

import com.umg.gastation.entity.VentaDiaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaDiariaRepository extends JpaRepository<VentaDiaria, Long> {
}
