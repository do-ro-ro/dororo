package com.dororo.api.User.dto.Response;

import java.sql.Timestamp;

import io.swagger.v3.oas.annotations.media.Schema;
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
