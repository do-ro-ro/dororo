package com.dororo.api.commnunity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class PostDto {  // Post Entity에 대응하는 필드를 모두 가지고 있는 dto

    private Integer postId;

    private Integer mapId;  // dto에서는 Integer로 맵ID를 나름
    private String postTitle;
    private String postContent;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private int scrapCount;

    private List<String> reviewRefs;

}
