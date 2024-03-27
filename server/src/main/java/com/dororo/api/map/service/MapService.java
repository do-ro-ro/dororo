package com.dororo.api.map.service;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.MapRepository;
import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.map.dto.*;
import jakarta.persistence.EntityNotFoundException;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MapService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MapRepository mapRepository;
    @Autowired
    private GeometryFactory geometryFactory;

    //좌표 -> LineString변환
    public LineString convertToLineString(List<LatitudeLongitude> latLngList) {
        Coordinate[] coordinates = new Coordinate[latLngList.size()];

        for (int i = 0; i < latLngList.size(); i++) {
            LatitudeLongitude latLng = latLngList.get(i);
            coordinates[i] = new Coordinate(latLng.getLongitude(), latLng.getLatitude());
        }
        return geometryFactory.createLineString(coordinates);
    }

    public List<MapResponseDto> getAllMaps(MapEntity.Maptype maptype, String token) {


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
            System.out.println("ID에 맞는 데이터가 없음!!!");
            throw new EntityNotFoundException("Map not found with id: " + mapId);
        }
        System.out.println("서비스 호출 성공적.");
        return DetailMapResponseDto.fromEntity(mapEntity);
    }

    public void deleteMapById(Integer mapId) {
        //mapId 가 DB에 없을때
        if (!mapRepository.existsById(mapId)) {
            throw new EntityNotFoundException("Map not found with id: " + mapId);
        }
        mapRepository.deleteById(mapId); // 맵 삭제
    }

    public void updateMapCompletion(Integer mapId, UpdateRequestDto updateRequestDto) {
        MapEntity mapEntity = mapRepository.findById(mapId)
                .orElseThrow(() -> new EntityNotFoundException("Map not found with id: " + mapId));
        System.out.println(updateRequestDto.getMapCompletion());
        mapEntity.setMapCompletion(updateRequestDto.getMapCompletion());
        mapRepository.save(mapEntity); // 변경된 엔티티 저장
    }

    public List<CreateMapResponseDto> createMap(CreateMapRequestDto createMapRequestDto) {
        //받은 addMapRequestDto 를 바탕으로 맵을 생성
        //알고 영역? => 나중에 클래스로 가져오기

        List<CreateMapResponseDto> createdMapList = new ArrayList<>();
        return createdMapList;
    }

    public void saveMap(AddMapRequestDto addMapRequestDto) {
        // 엔티티 변환 로직
        Optional<UserEntity> userEntity = userRepository.findByUserId(1);
        MapEntity mapEntity = new MapEntity();
        mapEntity.setMapRouteAxis(convertToLineString(addMapRequestDto.getMapRouteAxis()));
        mapEntity.setMapDistance(addMapRequestDto.getMapDistance());
        mapEntity.setMapName(addMapRequestDto.getMapName());
        mapEntity.setMapType(addMapRequestDto.getMapType());
        mapEntity.setMapImage(addMapRequestDto.getMapImage());
        mapEntity.setOriginalMapId(0);
        mapEntity.setMapCompletion(false);
        mapEntity.setUserId(userEntity.get());
        // 데이터베이스 저장
        mapRepository.save(mapEntity);
    }
}
