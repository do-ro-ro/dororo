package com.dororo.api.map.dto;

import com.dororo.api.db.entity.MapEntity;
import lombok.Builder;
import org.locationtech.jts.geom.LineString;

@Builder
public class DetailMapResponseDto {

    private Integer mapId;
    private String mapName;
    private String mapImage;
    // LineString을 더 친숙한 형식으로 변환해야 할 수 있습니다.
    private LineString mapRouteAxis;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;


    public static DetailMapResponseDto fromEntity(MapEntity entity) {
        return DetailMapResponseDto.builder()
                .mapId(entity.getMapId())
                .mapName(entity.getMapName())
                .mapImage(entity.getMapImage())
                .mapRouteAxis(entity.getMapRouteAxis())
                .mapType(entity.getMapType())
                .mapDistance(entity.getMapDistance())
                .originalMapId(entity.getOriginalMapId())
                .mapCompletion(entity.getMapCompletion())
                .build();
    }
}
