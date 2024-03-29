package com.dororo.api.map.service;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.MapRepository;
import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.map.dto.*;
import com.dororo.api.utils.auth.AuthUtils;
import com.dororo.api.utils.s3.S3Uploader;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
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
    @Autowired
    private S3Uploader s3Uploader;


    public List<MapResponseDto> getAllMaps(MapEntity.Maptype maptype, String access) {

        UserEntity userEntity = authUtils.getUserEntityFromAccess(access);
        List<MapEntity> maps;
        if(maptype == null){
            // mapRepository에서 maptype에 해당하는 MapEntity 리스트를 가져오기
             maps= mapRepository.findAllByUserId(userEntity);
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

    public List<CreateMapResponseDto> createMapSample(CreateMapRequestDto createMapRequestDto,String access) {

        List<CreateMapResponseDto> mapList = Arrays.asList(
                CreateMapResponseDto.builder()
                        .originMapRouteAxis(Arrays.asList(
                                new LatitudeLongitude(35.093481367865145, 128.85411060747438),
                                new LatitudeLongitude(35.093476836277425, 128.85258707526907),
                                new LatitudeLongitude(35.09565464874384, 128.85257551401855),
                                new LatitudeLongitude(35.09565202374567, 128.85131407621768),
                                new LatitudeLongitude(35.09569761764295, 128.84926070168464),
                                new LatitudeLongitude(35.09352202426886, 128.8492662634337),
                                new LatitudeLongitude(35.09346921144184, 128.84602638878414)
                        ))
                        .convertedRouteAxis(Arrays.asList(
                                new LatitudeLongitude(35.09358136786515, 128.85391060747438),
                                new LatitudeLongitude(35.09357683627743, 128.85288707526908),
                                new LatitudeLongitude(35.095354648743836, 128.85267551401856),
                                new LatitudeLongitude(35.095752023745675, 128.8516140762177),
                                new LatitudeLongitude(35.09579761764295, 128.84956070168465),
                                new LatitudeLongitude(35.09382202426886, 128.8491662634337),
                                new LatitudeLongitude(35.093569211441846, 128.84632638878415)
                        ))
                        .build(),
                CreateMapResponseDto.builder()
                        .originMapRouteAxis(Arrays.asList(
                                new LatitudeLongitude(35.19815664910374, 129.06524448666636),
                                new LatitudeLongitude(35.20420286823948, 129.06713341996885),
                                new LatitudeLongitude(35.20371346208389, 129.06951010749282),
                                new LatitudeLongitude(35.19638258721597, 129.07153195110658)
                        ))
                        .convertedRouteAxis(Arrays.asList(
                                new LatitudeLongitude(35.19825664910374, 129.06534448666636),
                                new LatitudeLongitude(35.20405286823948, 129.06721341996885),
                                new LatitudeLongitude(35.20367346208389, 129.06936010749283),
                                new LatitudeLongitude(35.19653258721597, 129.07145195110658)
                        ))
                        .build(),
                CreateMapResponseDto.builder()
                        .originMapRouteAxis(Arrays.asList(
                                new LatitudeLongitude(35.09351336801078, 128.86858788848588),
                                new LatitudeLongitude(35.09674705581143, 128.86707176414686),
                                new LatitudeLongitude(35.097979430476705, 128.86649391973913),
                                new LatitudeLongitude(35.09351002418198, 128.86576757647754),
                                new LatitudeLongitude(35.09351336801078, 128.86858788848588),
                                new LatitudeLongitude(35.088976492901494, 128.86933432610954)
                        ))
                        .convertedRouteAxis(Arrays.asList(
                                new LatitudeLongitude(35.09371336801078, 128.86868788848588),
                                new LatitudeLongitude(35.09659705581143, 128.86715176414685),
                                new LatitudeLongitude(35.09782943047671, 128.86657391973912),
                                new LatitudeLongitude(35.09366002418198, 128.86568757647754),
                                new LatitudeLongitude(35.093473368010784, 128.8684378884859),
                                new LatitudeLongitude(35.08912649290149, 128.86925432610954)
                        ))
                        .build()
        );

        return mapList;
    }

    public List<CreateMapResponseDto> createMap(CreateMapRequestDto createMapRequestDto,String access) {
        List<CreateMapResponseDto> mapList = new ArrayList<>();

        return mapList;
    }
    public void saveMap(AddMapRequestDto addMapRequestDto, String access, MultipartFile mapImage) {

        //로그인 한 유저 정보
        UserEntity userEntity = authUtils.getUserEntityFromAccess(access);
        String imageURL ;
        if(mapImage != null) {

             imageURL = s3Uploader.uploadFileToS3(mapImage, "mapImage");

        } else {
             imageURL = " ";
        }

        // 엔티티 변환 로직
        MapEntity mapEntity = new MapEntity();
        mapEntity.setOriginMapRouteAxis(convertToLineString(addMapRequestDto.getOriginMapRouteAxis()));
        mapEntity.setConvertedRouteAxis(convertToLineString(addMapRequestDto.getConvertedRouteAxis()));
        mapEntity.setMapDistance(addMapRequestDto.getMapDistance());
        mapEntity.setMapName(addMapRequestDto.getMapName());
        mapEntity.setMapType(addMapRequestDto.getMapType());
        mapEntity.setMapImage(imageURL);
        mapEntity.setOriginalMapId(0);
        mapEntity.setMapCompletion(false);
        mapEntity.setUserId(userEntity);
        // 데이터베이스 저장
        mapRepository.save(mapEntity);
    }
}
