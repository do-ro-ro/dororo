package com.dororo.api.User.dto.Response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
	private Integer userId;
	private String name;
	private String nickname;
	private String profileImage;
	private String uniqueId;
	private String role;
}