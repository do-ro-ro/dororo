package com.dororo.api.db.repository;

import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MapRepository extends JpaRepository<MapEntity, Integer> {
    //mapType에 맞춰 맵 가져오기
    List<MapEntity> findByMapType(MapEntity.Maptype mapType);
    MapEntity findByMapId(Integer mapId);

    Optional<MapEntity> findByUserIdAndOriginalMapId(UserEntity userId, Integer originalMapId);    // 스크랩 여부 조회 시 사용될 메서드

    List<MapEntity> findByUserIdAndMapType(UserEntity userId, MapEntity.Maptype mapType);

    List<MapEntity> findAllByUserId(UserEntity userEntity);

//    Object getUserId();
}
