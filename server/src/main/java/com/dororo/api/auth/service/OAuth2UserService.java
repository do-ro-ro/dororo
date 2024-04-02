package com.dororo.api.auth.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.dororo.api.auth.dto.response.CustomOAuth2User;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.auth.dto.response.RefreshTokenResponseDto;
import com.dororo.api.auth.provider.JwtProvider;
import com.dororo.api.redis.RedisService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;
	private final RedisService redisService;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(request);

		Map<String, String> responseMap = (Map<String, String>)oAuth2User.getAttributes().get("response");
		System.out.println("responseMap: "+responseMap);
		String uniqueId = responseMap.get("id").substring(0, 14);
		System.out.println("uniqueId " + uniqueId);

		String name = "";

		Optional<UserEntity> user = userRepository.findByUniqueId(uniqueId);
		if (user.isPresent()){
			System.out.println(user.toString());

			return new CustomOAuth2User(uniqueId);

		}

		String nickname = randomNickname(); //닉네임
		Optional<UserEntity> duplicatedNickname = userRepository.findByNickname(nickname); //닉네임 중복 검사

		while (duplicatedNickname.isPresent()) { //닉네임 새로 발급
			nickname = randomNickname();
			duplicatedNickname = userRepository.findByNickname(nickname);
		}

		String profileImage = ""; //프로필이미지
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

	private String randomNickname() {
		List<String> adj = Arrays.asList(
			"가냘픈", "가는", "가엾은", "가파른", "같은", "거센", "거친", "검은", "게으른", "고달픈", "고른", "고마운", "고운", "고픈", "곧은", "괜찮은",
			"구석진", "굳은", "굵은", "귀여운", "그런", "그른", "그리운", "기다란", "기쁜", "긴", "깊은", "깎아지른", "깨끗한", "나쁜", "나은", "난데없는",
			"날랜", "날카로운", "낮은", "너그러운", "너른", "널따란", "넓은", "네모난", "노란", "높은", "누런", "눅은", "느닷없는", "느린", "늦은", "다른",
			"더러운", "더운", "덜된", "동그란", "돼먹잖은", "된", "둥그런", "둥근", "뒤늦은", "드문", "딱한", "때늦은", "뛰어난", "뜨거운", "막다른", "많은",
			"매운", "먼", "멋진", "메마른", "메스꺼운", "모난", "못난", "못된", "못생긴", "무거운", "무딘", "무른", "무서운", "미끄러운", "미운", "바람직한",
			"반가운", "밝은", "밤늦은", "보드라운", "보람찬", "부드러운", "부른", "붉은", "비싼", "빠른", "빨간", "뻘건", "뼈저린", "뽀얀", "뿌연", "새로운",
			"서툰", "섣부른", "설운", "성가신", "센", "수줍은", "쉬운", "스스러운", "슬픈", "시원찮은", "싫은", "싼", "쌀쌀맞은", "쏜살같은", "쓰디쓴", "쓰린",
			"쓴", "아니꼬운", "아닌", "아름다운", "아쉬운", "아픈", "안된", "안쓰러운", "안타까운", "않은", "알맞은", "약빠른", "약은", "얇은", "얕은", "어두운",
			"어려운", "어린", "언짢은", "엄청난", "없는", "여문", "열띤", "예쁜", "올바른", "옳은", "외로운", "우스운", "의심스런", "이른", "익은", "있는",
			"작은", "잘난", "잘빠진", "잘생긴", "재미있는", "적은", "젊은", "점잖은", "조그만", "좁은", "좋은", "주제넘은", "줄기찬", "즐거운", "지나친", "지혜로운",
			"질긴", "짓궂은", "짙은", "짠", "짧은", "케케묵은", "큰", "탐스러운", "턱없는", "푸른", "한결같은", "흐린", "희망찬", "흰", "힘겨운"
		);
		List<String> noun = Arrays.asList(
			"고양이", "강아지", "거북이", "토끼", "뱀", "사자", "호랑이", "표범", "치타", "하이에나", "기린", "코끼리", "코뿔소", "하마", "악어", "펭귄",
			"부엉이", "올빼미", "곰", "돼지", "소", "닭", "독수리", "타조", "고릴라", "오랑우탄", "침팬지", "원숭이", "코알라", "캥거루", "고래", "상어",
			"칠면조", "직박구리", "쥐", "청설모", "메추라기", "앵무새", "삵", "스라소니", "판다", "오소리", "오리", "거위", "백조", "두루미", "고슴도치", "두더지",
			"아홀로틀", "맹꽁이", "너구리", "개구리", "두꺼비", "카멜레온", "이구아나", "노루", "제비", "까치", "고라니", "수달", "당나귀", "순록", "염소", "공작",
			"바다표범", "들소", "박쥐", "참새", "물개", "바다사자", "살모사", "구렁이", "얼룩말", "산양", "멧돼지", "카피바라", "도롱뇽", "북극곰", "퓨마", "미어캣",
			"코요테", "라마", "딱따구리", "기러기", "비둘기", "스컹크", "돌고래", "까마귀", "매", "낙타", "여우", "사슴", "늑대", "재규어", "알파카", "양",
			"다람쥐", "담비"
		);
		Collections.shuffle(adj);
		Collections.shuffle(noun);

		StringBuilder sb = new StringBuilder();
		sb.append(adj.get(0) + " " + noun.get(0));
		return sb.toString();
	}

	public RefreshTokenResponseDto getNewToken(String refreshToken) {
		RefreshTokenResponseDto refreshResult = jwtProvider.validateRefreshToken(refreshToken);
		if (refreshResult.getIsSuccess()) {
			List<String> getRefreshToken = redisService.getListValue(refreshToken);
			redisService.deleteKey(refreshToken);
			redisService.setStringValue(refreshResult.getRefreshToken(), getRefreshToken.get(0), jwtProvider.REFRESH_TOKEN_EXPIRE_TIME);
		}
		return refreshResult;
	}
}
