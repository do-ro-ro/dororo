package com.dororo.api.map.dto;


import com.dororo.api.db.entity.MapEntity;
import lombok.*;
import org.locationtech.jts.geom.LineString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapRequestDto {

    private String mapName;
    private String mapImage;
    // 경로를 더 간단한 표현으로 받은 후 LineString으로 변환할 가능성이 큽니다.
    private LineString mapRouteAxis;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;


    public MapEntity toEntity(MapRequestDto mapRequestDto) {
        MapEntity mapEntity = new MapEntity();
        mapEntity.setMapName(mapRequestDto.getMapName());
        mapEntity.setMapImage(mapRequestDto.getMapImage());
        mapEntity.setMapRouteAxis(mapRequestDto.getMapRouteAxis());
        mapEntity.setMapType(mapRequestDto.getMapType());
        mapEntity.setMapDistance(mapRequestDto.getMapDistance());
        mapEntity.setOriginalMapId(mapRequestDto.getOriginalMapId());
        mapEntity.setMapCompletion(mapRequestDto.getMapCompletion());
        return mapEntity;
    }



}
