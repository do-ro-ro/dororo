package com.dororo.api.exception;
import org.springframework.http.HttpStatus;

public abstract class DororoRuntimeException extends RuntimeException { // 서버 어플리케이션 전역에서 쓰일 예외의 추상 객체

    private final HttpStatus httpStatus;

    public DororoRuntimeException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

}
