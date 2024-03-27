package com.dororo.api.exception.advice;

import com.dororo.api.exception.NoMatchingResourceException;
import com.dororo.api.exception.NoTokenInHeaderException;
import com.dororo.api.exception.RefreshRequiredException;

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
    @ExceptionHandler(value = NoTokenInHeaderException.class)
    public ResponseEntity noTokenInHeaderException(NoTokenInHeaderException e) {
        return new ResponseEntity(e.getMessage(), e.getHttpStatus());
    }

    @ExceptionHandler(value = RefreshRequiredException.class)
    public ResponseEntity refreshRequiredException(RefreshRequiredException e) {
        return new ResponseEntity(e.getMessage(), e.getHttpStatus());
    }
    // <------------------------ Map part ------------------------>
    // <------------------------ Community part ------------------------>

}
