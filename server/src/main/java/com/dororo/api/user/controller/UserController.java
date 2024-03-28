package com.dororo.api.user.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.user.dto.request.UpdateProfileRequestDto;
import com.dororo.api.user.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@PutMapping("/profile") //닉네임, 프로필 이미지 수정
	public ResponseEntity updateUserProfile(@RequestHeader String access, @PathVariable Integer userId,@RequestBody UpdateProfileRequestDto updateProfileRequestDto) {
		UserEntity user = userService.updateUserProfile(access, updateProfileRequestDto);
		return new ResponseEntity(user, HttpStatus.OK);
	}


}