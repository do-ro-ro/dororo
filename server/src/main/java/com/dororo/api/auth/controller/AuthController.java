package com.dororo.api.auth.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dororo.api.auth.dto.request.RefreshTokenRequestDto;
import com.dororo.api.auth.dto.response.RefreshTokenResponseDto;
import com.dororo.api.auth.service.OAuth2UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final OAuth2UserService oAuth2UserService;

	@PostMapping("/refresh")
	public ResponseEntity signInWithExpiredAccessToken(@RequestBody RefreshTokenRequestDto refreshTokenRequestDto) {

		RefreshTokenResponseDto refreshResult = oAuth2UserService.getNewToken(refreshTokenRequestDto.getRefreshToken());
		if (refreshResult.isSuccess()) { //리프레시 토큰이 유효한 경우
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("access", refreshResult.getAccessToken());
			responseHeaders.set("refresh", refreshResult.getRefreshToken());

			return new ResponseEntity(refreshResult, responseHeaders, HttpStatus.OK);
		}
		//리프레시 토큰이 유효하지 않는 경우
		return new ResponseEntity("Refresh token validation failed. Login required", HttpStatus.UNAUTHORIZED);
	}
}
