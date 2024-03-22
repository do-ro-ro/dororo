package com.dororo.api.commnunity.exception;
import org.springframework.http.HttpStatus;

public abstract class CommunityRuntimeException extends RuntimeException {

    private final HttpStatus httpStatus;

    public CommunityRuntimeException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

}
