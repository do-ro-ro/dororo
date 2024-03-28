package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import lombok.*;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.LineString;

import java.util.ArrayList;
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
    private String mapImage;
    private List<LatitudeLongitude> originMapRouteAxis;
    private List<LatitudeLongitude> convertedMapRouteAxis;
    private MapEntity.Maptype mapType;
    private Float mapDistance;
    private Integer originalMapId;
    private Boolean mapCompletion;



    public static MapResponseDto fromEntity(MapEntity entity) {
        return MapResponseDto.builder()
                .mapId(entity.getMapId())
                .mapName(entity.getMapName())
                .mapImage(entity.getMapImage())
                .originMapRouteAxis(convertFromLineString(entity.getOriginMapRouteAxis()))
                .convertedMapRouteAxis(convertFromLineString(entity.getConvertedMapRouteAxis()))
                .mapType(entity.getMapType())
                .mapDistance(entity.getMapDistance())
                .originalMapId(entity.getOriginalMapId())
                .mapCompletion(entity.getMapCompletion())
                .build();
    }


}
