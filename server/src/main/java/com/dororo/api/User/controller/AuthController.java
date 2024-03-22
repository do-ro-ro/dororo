package com.dororo.api.User.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dororo.api.User.dto.Request.SignUpRequestDto;
import com.dororo.api.User.dto.Response.SignUpResponseDto;
import com.dororo.api.User.service.AuthService;

import jakarta.validation.Valid;

@Controller
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/api/auth/sign-up")
	public ResponseEntity<? super SignUpResponseDto> signUp (
		@RequestBody @Valid SignUpRequestDto requestBody
	) {
		ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
		return response;
	}


}
