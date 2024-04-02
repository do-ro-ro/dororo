package com.dororo.api.exception;

import org.springframework.http.HttpStatus;

public class PostAlreadyExistsException extends DororoRuntimeException {

    public PostAlreadyExistsException() {
        super("Post already exists.", HttpStatus.CONFLICT);
    }

}
