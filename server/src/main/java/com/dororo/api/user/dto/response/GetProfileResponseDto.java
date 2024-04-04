package com.dororo.api.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class GetProfileResponseDto {
	private String name;
	private String profileImage;
	private String nickname;

	@Override
	public String toString() {
		return "GetProfileResponseDto{" +
			"name='" + name + '\'' +
			", profileImage='" + profileImage + '\'' +
			", nickname='" + nickname + '\'' +
			'}';
	}

	@Builder
	public GetProfileResponseDto(String name, String profileImage, String nickname) {
		this.name = name;
		this.profileImage = profileImage;
		this.nickname = nickname;
	}
}
