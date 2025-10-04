package com.umg.gastation.repository;

import com.umg.gastation.entity.ReporteFinanciero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReporteFinancieroRepository extends JpaRepository<ReporteFinanciero, Long> {
}
