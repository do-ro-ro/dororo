package com.dororo.api.commnunity.dto.request;

import lombok.Getter;

@Getter
public abstract class PostRequestDto {  // post의 request에서 공통으로 받아오는 값들을 선언한 추상 클래스

    protected Integer mapId;

}
