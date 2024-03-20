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

public class MapRequestDto {

    private Integer userId; // 클라이언트가 userId를 보낸다고 가정
    private String mapName;
    private String mapImage;
    // 경로를 더 간단한 표현으로 받은 후 LineString으로 변환할 가능성이 큽니다.
    private LineString mapRouteAxis;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;
}
