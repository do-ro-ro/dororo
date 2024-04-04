package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateMapResponseDto {

    //경로 <위도,경도> 리스트
    private List<LatitudeLongitude> originMapRouteAxis;
    private List<LatitudeLongitude> convertedRouteAxis;
    //맵의 길이
    private float mapDistance;

}
