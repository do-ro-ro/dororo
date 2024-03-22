package com.dororo.api.commnunity.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.sql.Timestamp;

public abstract class GetPostDto {

    private Integer postId;
    
    @Schema(description = "Post의 원본 맵 ID, 스크랩 기능에 필요함")
    private Integer mapId;
    @Schema(description = "S3 버킷에 저장된 맵 이미지의 주소")
    private String mapImage;
    private String userName;    // 게시글 작성자 명
    private Timestamp createdAt;    // 최신 순 정렬에 사용
    private int scrapCount; // 인기 순 정렬에 사용

}
