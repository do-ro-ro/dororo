package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Builder
@Getter
@Setter
public class DetailMapResponseDto {

    private Integer mapId;
    private String mapName;
    private String mapImage;
    // LineString을 더 친숙한 형식으로 변환해야 할 수 있습니다.
    //private LineString mapRouteAxis;
    private List<LatitudeLongitude> mapRouteAxis;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;


    //클라이언트에 dto 를 보낼때 LineString 타입으로 바로 보내면 클라이언트에서 변환계산이 복잡함.
    //entity 에서 불러온 데이터를 dto 로만들때 LineString을 미리 변환해서 (위도,경도)의 리스트로 보낸다.
    public static DetailMapResponseDto fromEntity(MapEntity entity) {
        List<LatitudeLongitude> routeAxis = Stream.of(entity.getOriginMapRouteAxis().getCoordinates())
                .map(coord -> new LatitudeLongitude(coord.y, coord.x)) // y가 위도, x가 경도
                .collect(Collectors.toList());
        return DetailMapResponseDto.builder()
                .mapId(entity.getMapId())
                .mapName(entity.getMapName())
                .mapImage(entity.getMapImage())
                .mapRouteAxis(routeAxis)
                .mapType(entity.getMapType())
                .mapDistance(entity.getMapDistance())
                .originalMapId(entity.getOriginalMapId())
                .mapCompletion(entity.getMapCompletion())
                .build();
    }
}
