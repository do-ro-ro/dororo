package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import lombok.*;

import java.util.List;

import static com.dororo.api.convert.ConvertUtils.convertFromLineString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MapResponseDto {

    private Integer mapId;
    private String mapName;

    private List<LatitudeLongitude> originMapRouteAxis;
    private List<LatitudeLongitude> convertedRouteAxis;
    private List<LatitudeLongitude> path;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;




    public static MapResponseDto fromEntity(MapEntity entity) {
        return MapResponseDto.builder()
                .mapId(entity.getMapId())
                .mapName(entity.getMapName())
                .originMapRouteAxis(convertFromLineString(entity.getOriginMapRouteAxis()))
                .convertedRouteAxis(convertFromLineString(entity.getConvertedRouteAxis()))
                .path(convertFromLineString(entity.getPath()))
                .mapType(entity.getMapType())
                .mapDistance(entity.getMapDistance())
                .originalMapId(entity.getOriginalMapId())
                .mapCompletion(entity.getMapCompletion())
                .build();
    }


}
