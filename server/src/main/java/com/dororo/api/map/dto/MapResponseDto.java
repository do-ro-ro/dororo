package com.dororo.api.map.dto;

import com.dororo.api.db.entity.MapEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.LineString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class MapResponseDto {

    private Integer mapId;
    private Integer userId; // 응답에서는 userId만 필요할 것으로 가정
    private String mapName;
    private String mapImage;
    // LineString을 더 친숙한 형식으로 변환해야 할 수 있습니다.
    private LineString mapRouteAxis;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;
}
