package com.dororo.api.user.dto.request;

import lombok.Getter;

@Getter
public class RefreshTokenRequestDto {
	private String uniqueId;
	private String refreshToken;
}
