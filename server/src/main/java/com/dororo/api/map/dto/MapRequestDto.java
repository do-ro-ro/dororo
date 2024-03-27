package com.dororo.api.map.dto;


import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import lombok.*;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapRequestDto {

    private String mapName;
    private String mapImage;
    //받을때는 위도 경도 로 받기.
    private List<LatitudeLongitude> mapRouteAxis;
    private MapEntity.Maptype mapType;
    private float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;

    private static final GeometryFactory geometryFactory = new GeometryFactory();

    // 위도와 경도 리스트를 LineString으로 변환
    private LineString convertToLineString(List<LatitudeLongitude> latLngList) {
        Coordinate[] coordinates = latLngList.stream()
                .map(latLng -> new Coordinate(latLng.getLongitude(), latLng.getLatitude()))
                .toArray(Coordinate[]::new);

        return geometryFactory.createLineString(coordinates);
    }



    public MapEntity toEntity(MapRequestDto mapRequestDto) {
        MapEntity mapEntity = new MapEntity();
        mapEntity.setMapName(mapRequestDto.getMapName());
        mapEntity.setMapImage(mapRequestDto.getMapImage());
        mapEntity.setMapRouteAxis(convertToLineString(mapRequestDto.getMapRouteAxis()));
        mapEntity.setMapType(mapRequestDto.getMapType());
        mapEntity.setMapDistance(mapRequestDto.getMapDistance());
        mapEntity.setOriginalMapId(mapRequestDto.getOriginalMapId());
        mapEntity.setMapCompletion(mapRequestDto.getMapCompletion());
        return mapEntity;
    }



}
