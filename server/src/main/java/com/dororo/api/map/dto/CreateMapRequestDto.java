package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
<<<<<<< HEAD

=======
>>>>>>> c94babb26538e7220e451701c9d48cd431d06d39
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
    private LatitudeLongitude startPoint;
}
