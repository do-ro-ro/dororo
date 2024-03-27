package com.dororo.api.exception;

import org.springframework.http.HttpStatus;

public class NoTokenInHeaderException extends DororoRuntimeException {
	public NoTokenInHeaderException() {
		super("No token in header.", HttpStatus.FORBIDDEN);
	}

}
