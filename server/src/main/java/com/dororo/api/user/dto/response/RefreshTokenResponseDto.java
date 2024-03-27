package com.dororo.api.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RefreshTokenResponseDto {
	private String accessToken;
	private String refreshToken;
	private boolean success;
}
