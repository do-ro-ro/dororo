package com.dororo.api.exception;

import org.springframework.http.HttpStatus;

public class NoTokenInHeaderException extends DororoRuntimeException {
	public NoTokenInHeaderException(String message) {    // 각 기능에서 호출 시  message만 달리해서 예외 생서하여 사용, status code는 401로 통일
		super(message, HttpStatus.FORBIDDEN);
	}

}
