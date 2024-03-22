package com.dororo.api.User.service.implement;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.dororo.api.User.dto.Response.CustomOAuth2User;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(request);

		Map<String, String> responseMap = (Map<String, String>)oAuth2User.getAttributes().get("response");
		String uniqueId = responseMap.get("id").substring(0,14);
		String name = responseMap.get("name");

		UserEntity user = userRepository.findByUniqueId(uniqueId);
		if(user!=null)
			return new CustomOAuth2User(uniqueId);

		String nickname = "0322랜덤 닉네임"; //닉네임
		String profileImage = "0322이미지 경로"; //프로필이미지
		String role = "ROLE_USER"; //role

		UserEntity userEntity = new UserEntity();
		userEntity.setName(name);
		userEntity.setUniqueId(uniqueId);
		userEntity.setNickname(nickname);
		userEntity.setProfileImage(profileImage);
		userEntity.setRole(role);
		userRepository.save(userEntity);

		return new CustomOAuth2User(uniqueId);
	}
}
