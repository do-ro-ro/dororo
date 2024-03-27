package com.dororo.api.db.repository;

import com.dororo.api.db.entity.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapRepository extends JpaRepository<MapEntity, Integer> {
    //mapType에 맞춰 맵 가져오기
    List<MapEntity> findByMapType(MapEntity.Maptype mapType);

    MapEntity findByMapId(Integer mapId);
    List<MapEntity> findByUserIdAndMapType(Integer userId, MapEntity.Maptype mapType);

    Object getUserId();
}
