package com.dororo.api.User.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dororo.api.User.dto.Request.SignUpRequestDto;
import com.dororo.api.User.dto.Response.ResponseDto;
import com.dororo.api.User.dto.Response.SignUpResponseDto;
import com.dororo.api.User.service.AuthService;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

	private final UserRepository userRepository;

	@Override
	public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
		try {
			String userUniqueId = dto.getUniqueId();
			String name = dto.getName();

			UserEntity user = userRepository.findByUniqueId(userUniqueId);
			if(user!=null)
				return SignUpResponseDto.isExistUser();

			//닉네임
			String nickname = "랜덤 닉네임";
			//프로필이미지
			String profileImage = "이미지 경로";
			//role
			String role = "ROLE_USER";

			UserEntity userEntity = new UserEntity();
			userEntity.setName(name);
			userEntity.setUniqueId(userUniqueId);
			userEntity.setNickname(nickname);
			userEntity.setProfileImage(profileImage);
			userEntity.setRole(role);

			userRepository.save(userEntity);
		} catch (Exception exception) {
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}
		return SignUpResponseDto.success();
	}
}
