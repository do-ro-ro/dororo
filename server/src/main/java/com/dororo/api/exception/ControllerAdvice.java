package com.dororo.api.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    // <------------------------ All-round ------------------------>
    @ExceptionHandler(value = NoMatchingResourceException.class)
    public ResponseEntity noMatchingResource(NoMatchingResourceException e) {   // 요청 받은 자원이 없을 경우 던진 예외를 처리, status code: 401
        return new ResponseEntity(e.getMessage(), e.getHttpStatus());
    }

    // <------------------------ Auth part ------------------------>
    // <------------------------ Map part ------------------------>
    // <------------------------ Community part ------------------------>

}
