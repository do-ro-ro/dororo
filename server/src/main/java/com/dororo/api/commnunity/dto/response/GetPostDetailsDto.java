package com.dororo.api.commnunity.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  // 틀 작성하는 시점에서는 기본 생성자를 두지만, 로직 작성 완료 후 필요 없으면 지울 것
@AllArgsConstructor
@Getter
@Setter
public class GetPostDetailsDto {

    private Integer postId;

    @Schema(description = "Post의 원본 맵 ID")
    private Integer mapId;
    @Schema(description = "S3 버킷에 저장된 맵 이미지의 주소")
    private String mapImage;
    private String postTitle;
    private String postContent;
    private int scrapCount;

}
