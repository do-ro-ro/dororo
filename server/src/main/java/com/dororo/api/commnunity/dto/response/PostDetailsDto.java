package com.dororo.api.commnunity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.LineString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostDetailsDto extends PostResponseDto {

    private String postTitle;
    private String postContent;
    private LineString mapRouteAxis;    // 지도에 표출할 경로

}
