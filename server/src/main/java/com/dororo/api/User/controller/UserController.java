package com.dororo.api.User.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController("/api/users")
public class UserController {

	@GetMapping("/{userId}/profile")
	public ResponseEntity modifyProfile(@PathVariable Integer userId) {

	}
}
