package com.dororo.api.commnunity.dto;

import com.dororo.api.db.entity.MapEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class PostDto {

    private Integer postId;

    private MapEntity mapId;
    private String postTitle;
    private String postContent;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private int scrapCount;

    private List<String> reviewRefs;

}
