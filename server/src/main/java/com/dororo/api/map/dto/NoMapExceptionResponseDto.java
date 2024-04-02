package com.dororo.api.map.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NoMapExceptionResponseDto {
	private int lackLeft;
	private int lackRight;
	private int lackUTurn;

}
