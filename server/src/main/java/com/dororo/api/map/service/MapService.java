package com.dororo.api.map.service;

import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.repository.MapRepository;
import com.dororo.api.map.dto.DetailMapResponseDto;
import com.dororo.api.map.dto.MapResponseDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MapService {

    @Autowired
    private MapRepository mapRepository;

    public List<MapResponseDto> getAllMaps(MapEntity.Maptype maptype) {
        // mapRepository에서 maptype에 해당하는 MapEntity 리스트를 가져오기
        List<MapEntity> maps = mapRepository.findByMapType(maptype);

        // 가져온 MapEntity 리스트를 MapResponseDto 리스트로 변환
        List<MapResponseDto> mapResponseDtos = maps.stream()
                .map(mapEntity -> MapResponseDto.fromEntity(mapEntity))
                .collect(Collectors.toList());

        return mapResponseDtos;
    }

    public DetailMapResponseDto getMapById(Integer mapId) {
        MapEntity mapEntity = mapRepository.findByMapId(mapId);
        if (mapEntity == null) {
            throw new EntityNotFoundException("Map not found with id: " + mapId);
        }
        return DetailMapResponseDto.fromEntity(mapEntity);
    }

    public void deleteMapById(Integer mapId) {
        //mapId 가 DB에 없을때
        if (!mapRepository.existsById(mapId)) {
            throw new EntityNotFoundException("Map not found with id: " + mapId);
        }
        mapRepository.deleteById(mapId); // 맵 삭제
    }

    public void updateMapCompletion(Integer mapId, Boolean mapCompletion) {
        MapEntity mapEntity = mapRepository.findById(mapId)
                .orElseThrow(() -> new EntityNotFoundException("Map not found with id: " + mapId));
        mapEntity.setMapCompletion(mapCompletion);
        mapRepository.save(mapEntity); // 변경된 엔티티 저장
    }
}
