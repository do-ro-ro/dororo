package com.dororo.api.exception;

import org.springframework.http.HttpStatus;

public class RefreshRequiredException extends DororoRuntimeException {
	public RefreshRequiredException() {
		super("Get new refreshToken", HttpStatus.UNAUTHORIZED);
	}
}
