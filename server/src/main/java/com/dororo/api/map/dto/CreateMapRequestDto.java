package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMapRequestDto {
    private int turnLeft;
    private int turnRight;
    private int uuuTurn;
    private float mapDistance;
    private boolean isReturn; //왕복 편도 여부
    private LatitudeLongitude startPoint;
}
