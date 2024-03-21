package com.dororo.api.User.service;

import org.springframework.http.ResponseEntity;

import com.dororo.api.User.dto.Request.SignUpRequestDto;
import com.dororo.api.User.dto.Response.SignUpResponseDto;

public interface AuthService {
	ResponseEntity<? super SignUpResponseDto> signUp (SignUpRequestDto dto);
}
