package com.dororo.api.commnunity.dto.request;

import lombok.Getter;

@Getter
public class AddPostDto extends PostRequestDto {

    private String postTitle;
    private String postContent;

}
