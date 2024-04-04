package com.dororo.api.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class NoMapException extends RuntimeException {
	private final int lackLeft;
	private final int lackRight;
	private final int lackUTurn;
	private final HttpStatus httpStatus;

	public NoMapException(int lackLeft, int lackRight, int lackUTurn) {
		this.lackLeft = lackLeft;
		this.lackRight = lackRight;
		this.lackUTurn = lackUTurn;
		this.httpStatus = HttpStatus.OK;
	}
}
