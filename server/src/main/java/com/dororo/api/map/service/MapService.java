package com.dororo.api.map.service;

import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.MapRepository;
import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.map.dto.*;
import com.dororo.api.utils.auth.AuthUtils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.dororo.api.convert.ConvertUtils.convertToLineString;

@Service
public class MapService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MapRepository mapRepository;
    @Autowired
    private AuthUtils authUtils;



    public List<MapResponseDto> getAllMaps(MapEntity.Maptype maptype, String access) {

        UserEntity userEntity = authUtils.getUserEntityFromAccess(access);
        List<MapEntity> maps;
        if(maptype == null){
            // mapRepository에서 maptype에 해당하는 MapEntity 리스트를 가져오기
             maps= mapRepository.findAll(userEntity);
        }
        else{
            // mapRepository에서 maptype에 해당하는 MapEntity 리스트를 가져오기
            maps = mapRepository.findByUserIdAndMapType(userEntity,maptype);
        }

        // 가져온 MapEntity 리스트를 MapResponseDto 리스트로 변환
        List<MapResponseDto> mapResponseDtos = maps.stream()
                .map(mapEntity -> MapResponseDto.fromEntity(mapEntity))
                .collect(Collectors.toList());

        return mapResponseDtos;
    }

    public DetailMapResponseDto getMapById(Integer mapId,String access) {
        MapEntity mapEntity = mapRepository.findByMapId(mapId);
        if (mapEntity == null) {
            System.out.println("ID에 맞는 데이터가 없음!!!");
            throw new EntityNotFoundException("Map not found with id: " + mapId);
        }
        System.out.println("서비스 호출 성공적.");
        return DetailMapResponseDto.fromEntity(mapEntity);
    }

    public void deleteMapById(Integer mapId,String access) {
        UserEntity userEntity = authUtils.getUserEntityFromAccess(access);
        Integer userId = userEntity.getUserId();

        MapEntity mapEntity = mapRepository.findById(mapId)
                .orElseThrow(() -> new EntityNotFoundException("Map not found with id: " + mapId));
        // 맵의 소유자가 현재 로그인한 사용자인지 확인.
        if (!mapEntity.getUserId().getUserId().equals(userId)) {
            throw new AccessDeniedException("User does not have permission to delete this map.");
        }
        mapRepository.deleteById(mapId); // 맵 삭제
    }

    public void updateMapCompletion(Integer mapId, UpdateRequestDto updateRequestDto,String access) {
        MapEntity mapEntity = mapRepository.findById(mapId)
                .orElseThrow(() -> new EntityNotFoundException("Map not found with id: " + mapId));
        System.out.println(updateRequestDto.getMapCompletion());
        mapEntity.setMapCompletion(updateRequestDto.getMapCompletion());
        mapRepository.save(mapEntity); // 변경된 엔티티 저장
    }

    public List<CreateMapResponseDto> createMap(CreateMapRequestDto createMapRequestDto,String access) {
        //받은 addMapRequestDto 를 바탕으로 맵을 생성
        //알고 영역? => 나중에 클래스로 가져오기

        List<CreateMapResponseDto> createdMapList = new ArrayList<>();
        return createdMapList;
    }

    public void saveMap(AddMapRequestDto addMapRequestDto,String access) {
        //로그인 한 유저 정보
        UserEntity userEntity = authUtils.getUserEntityFromAccess(access);
       // 엔티티 변환 로직
        System.out.println("save 에서 addMapRequestDto.getOriginMapRouteAxis() : "+ addMapRequestDto.getOriginMapRouteAxis());
        System.out.println("convertToLineString(addMapRequestDto.getOriginMapRouteAxis()) : " + convertToLineString(addMapRequestDto.getOriginMapRouteAxis()));
        MapEntity mapEntity = new MapEntity();
        mapEntity.setOriginMapRouteAxis(convertToLineString(addMapRequestDto.getOriginMapRouteAxis()));
        mapEntity.setConvertedRouteAxis(convertToLineString(addMapRequestDto.getConvertedRouteAxis()));
        mapEntity.setMapDistance(addMapRequestDto.getMapDistance());
        mapEntity.setMapName(addMapRequestDto.getMapName());
        mapEntity.setMapType(addMapRequestDto.getMapType());
        mapEntity.setMapImage(addMapRequestDto.getMapImage());
        mapEntity.setOriginalMapId(0);
        mapEntity.setMapCompletion(false);
        mapEntity.setUserId(userEntity);
        // 데이터베이스 저장
        mapRepository.save(mapEntity);
    }
}
