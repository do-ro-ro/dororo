package com.dororo.api.user.dto.response;

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