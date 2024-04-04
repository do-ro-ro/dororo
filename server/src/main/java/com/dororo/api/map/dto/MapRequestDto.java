package com.dororo.api.map.dto;


import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import lombok.*;
import org.locationtech.jts.geom.GeometryFactory;

import java.util.List;

import static com.dororo.api.convert.ConvertUtils.convertToLineString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapRequestDto {

    private String mapName;
    //받을때는 위도 경도 로 받기.
    private List<LatitudeLongitude> originMapRouteAxis;
    private List<LatitudeLongitude> convertedRouteAxis;
    private MapEntity.Maptype mapType;
    private float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;

    private static final GeometryFactory geometryFactory = new GeometryFactory();





    public MapEntity toEntity(MapRequestDto mapRequestDto) {
        MapEntity mapEntity = new MapEntity();
        mapEntity.setMapName(mapRequestDto.getMapName());
        mapEntity.setOriginMapRouteAxis(convertToLineString(mapRequestDto.getOriginMapRouteAxis()));
        mapEntity.setConvertedRouteAxis(convertToLineString(mapRequestDto.getConvertedRouteAxis()));
        mapEntity.setMapType(mapRequestDto.getMapType());
        mapEntity.setMapDistance(mapRequestDto.getMapDistance());
        mapEntity.setOriginalMapId(mapRequestDto.getOriginalMapId());
        mapEntity.setMapCompletion(mapRequestDto.getMapCompletion());
        return mapEntity;
    }



}
