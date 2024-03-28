package com.dororo.api.commnunity.dto.response;

import com.dororo.api.db.entity.MapEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public abstract class PostResponseDto { // post의 response에서 공통으로 반환하는 값들을 선언한 추상 클래스

    protected Integer postId;
    
    @Schema(description = "Post의 원본 맵 ID, 스크랩 기능에 필요함")
    protected Integer mapId;
    @Schema(description = "S3 버킷에 저장된 맵 이미지의 주소")
    protected String mapImage;
    protected String userName;    // 게시글 작성자 명
    protected Timestamp createdAt;    // 최신 순 정렬에 사용
    protected int scrapCount; // 인기 순 정렬에 사용

}
