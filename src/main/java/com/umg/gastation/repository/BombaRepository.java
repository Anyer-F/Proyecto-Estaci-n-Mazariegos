package com.umg.gastation.repository;

import com.umg.gastation.entity.Bomba;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BombaRepository extends JpaRepository<Bomba, Long> {
}
