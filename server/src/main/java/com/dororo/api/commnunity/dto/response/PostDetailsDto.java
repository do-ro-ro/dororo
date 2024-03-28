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

    private String userProfileImage;    // 유저의 프로필사진
    private String postTitle;
    private String postContent;

}
