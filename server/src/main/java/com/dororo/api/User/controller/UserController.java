package com.dororo.api.User.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dororo.api.User.dto.Request.UpdateProfileRequestDto;
import com.dororo.api.User.service.UserService;
import com.dororo.api.db.entity.UserEntity;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@PutMapping("/{userId}/profile") //닉네임, 프로필 이미지 수정
	public ResponseEntity updateUserProfile(@PathVariable Integer userId, @RequestBody UpdateProfileRequestDto updateProfileRequestDto) {
		UserEntity user = userService.updateUserProfile(userId, updateProfileRequestDto);
		return new ResponseEntity(user, HttpStatus.OK);
	}
}