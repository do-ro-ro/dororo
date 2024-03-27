package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMapResponseDto {

    //경로 <위도,경도> 리스트
    private List<LatitudeLongitude> mapRouteAxis;
    //맵의 길이
    private float mapDistance;


//    public static CreateMapResponseDto fromEntity(MapEntity entity) {
//        List<LatitudeLongitude> routeAxis = Stream.of(entity.getMapRouteAxis().getCoordinates())
//                .map(coord -> new LatitudeLongitude(coord.y, coord.x)) // y가 위도, x가 경도
//                .collect(Collectors.toList());
//        return CreateMapResponseDto.builder()
//                .mapRouteAxis(routeAxis)
//                .mapDistance(entity.getMapDistance())
//                .build();
//    }
}
