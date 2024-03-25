package com.dororo.api.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import com.dororo.api.user.dto.Request.UpdateProfileRequestDto;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.exception.NoMatchingResourceException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	public UserEntity updateUserProfile(Integer userId, UpdateProfileRequestDto updateProfileRequestDto) {

		Optional<UserEntity> tempUserEntity = userRepository.findByUserId(userId);
		if (!tempUserEntity.isPresent()) throw new NoMatchingResourceException("No User");

		UserEntity userEntity = tempUserEntity.get();

		userEntity.setNickname(updateProfileRequestDto.getNickname());
		userEntity.setProfileImage(updateProfileRequestDto.getProfileImage());

		return userRepository.save(userEntity);
	}
}
