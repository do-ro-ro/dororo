package com.dororo.api.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dororo.api.user.dto.request.UpdateProfileRequestDto;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.exception.NoMatchingResourceException;
import com.dororo.api.user.dto.response.GetProfileResponseDto;
import com.dororo.api.utils.auth.AuthUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;

	private final AuthUtils authUtils;
	public UserEntity updateUserProfile(String access, UpdateProfileRequestDto updateProfileRequestDto) {

		String uniqueId = authUtils.getUserUniqueIdFromAccess(access);
		Optional<UserEntity> tempUserEntity = userRepository.findByUniqueId(uniqueId);
		if (!tempUserEntity.isPresent()) throw new NoMatchingResourceException("No User");

		UserEntity userEntity = UserEntity.builder()
			.userId(tempUserEntity.get().getUserId())
			.name(tempUserEntity.get().getName())
			.nickname(updateProfileRequestDto.getNickname())
			.profileImage(updateProfileRequestDto.getProfileImage())
			.uniqueId(tempUserEntity.get().getUniqueId())
			.role(tempUserEntity.get().getRole())
			.build();

		return userRepository.save(userEntity);
	}

	public GetProfileResponseDto getUserProfile(String access) {
		String uniqueId = authUtils.getUserUniqueIdFromAccess(access);

		Optional<UserEntity> userEntity = userRepository.findByUniqueId(uniqueId);
		if (!userEntity.isPresent()) throw new NoMatchingResourceException("No User");

		GetProfileResponseDto user = GetProfileResponseDto.builder()
			.name(userEntity.get().getName())
			.nickname(userEntity.get().getNickname())
			.profileImage(userEntity.get().getProfileImage())
			.build();
		return user;
	}
}
