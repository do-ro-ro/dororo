package com.dororo.api.commnunity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.locationtech.jts.geom.LineString;

@AllArgsConstructor
@Getter
@Setter
public class GetPostDetailsDto extends GetPostDto {

    private String postTitle;
    private String postContent;
    private LineString mapRouteAxis;    // 지도에 표출할 경로

}
