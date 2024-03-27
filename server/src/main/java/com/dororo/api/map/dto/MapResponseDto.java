package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import lombok.*;
import org.apache.coyote.Response;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapResponseDto {

    private Integer mapId;
    private String mapName;
    private String mapImage;
    private List<LatitudeLongitude> mapRouteAxis;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;


    // LineString을 LatitudeLongitude 리스트로 변환하는 유틸리티 메소드
    private static List<LatitudeLongitude> convertLineStringToList(LineString lineString) {
        List<LatitudeLongitude> latLngList = new ArrayList<>();
        if (lineString != null) {
            for (Coordinate coord : lineString.getCoordinates()) {
                latLngList.add(new LatitudeLongitude(coord.y, coord.x)); // y가 위도, x가 경도
            }
        }
        return latLngList;
    }

    public static MapResponseDto fromEntity(MapEntity entity) {
        return MapResponseDto.builder()
                .mapId(entity.getMapId())
                .mapName(entity.getMapName())
                .mapImage(entity.getMapImage())
                .mapRouteAxis(convertLineStringToList(entity.getMapRouteAxis()))
                .mapType(entity.getMapType())
                .mapDistance(entity.getMapDistance())
                .originalMapId(entity.getOriginalMapId())
                .mapCompletion(entity.getMapCompletion())
                .build();
    }


}
