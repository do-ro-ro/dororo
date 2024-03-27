package com.dororo.api.map.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMapRequestDto {

    private int turnLeft;
    private int turnRight;
    private int uTurn;
    private float mapDistance;






}
