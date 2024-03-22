package com.dororo.api.commnunity.dto.request;

import lombok.Getter;

@Getter
public class AddPostDto extends PostRequestDto {

    private String postTitle;
    private String postContent;
    private String reviewRef;   // 사용자가 선택한 리뷰의 색인

}
