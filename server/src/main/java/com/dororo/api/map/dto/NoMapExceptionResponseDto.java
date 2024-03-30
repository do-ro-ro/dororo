package com.dororo.api.map.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NoMapExceptionResponseDto {
	private int lackLeft;
	private int lackRight;
	private int lackUTurn;

}
