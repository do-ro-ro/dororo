package com.dororo.api.exception;

import org.springframework.http.HttpStatus;

public class NoMatchingResourceException extends DororoRuntimeException {   // 요청 받은 자원이 없는 경우 쓰일 예외
    
    public NoMatchingResourceException(String message) {    // 각 기능에서 호출 시  message만 달리해서 예외 생서하여 사용, status code는 401로 통일
        super(message, HttpStatus.NOT_FOUND);
    }

}
