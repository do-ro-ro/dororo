package com.dororo.api.exception.advice;

import com.dororo.api.exception.NoMapException;
import com.dororo.api.exception.NoMatchingResourceException;
import com.dororo.api.exception.NoTokenInHeaderException;
import com.dororo.api.exception.RefreshRequiredException;
import com.dororo.api.map.dto.NoMapExceptionResponseDto;

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
    @ExceptionHandler(value = NoMapException.class)
    public ResponseEntity noMap(NoMapException e) {
        System.out.println("nomapppppp");
        NoMapExceptionResponseDto noMapExceptionResponseDto = new NoMapExceptionResponseDto(e.getLackLeft(), e.getLackRight(), e.getLackUTurn());
        return new ResponseEntity(noMapExceptionResponseDto, e.getHttpStatus());
    }
    // <------------------------ Community part ------------------------>

}
