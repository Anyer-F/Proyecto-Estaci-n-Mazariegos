package com.umg.gastation.repository;

import com.umg.gastation.entity.RegistroCombustible;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RegistroCombustibleRepository extends JpaRepository<RegistroCombustible, Long> {

    List<RegistroCombustible> findByTanqueId(Long tanqueId);
}
