package com.dororo.api.db.repository;

import com.dororo.api.db.entity.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MapRepo extends JpaRepository<MapEntity, Integer> {

}
