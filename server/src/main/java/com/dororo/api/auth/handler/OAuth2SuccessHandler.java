package com.dororo.api.auth.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.dororo.api.auth.dto.response.CustomOAuth2User;
import com.dororo.api.auth.provider.JwtProvider;
import com.dororo.api.redis.RedisService;

import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtProvider jwtProvider;
	private final RedisService redisService;

	@Override
	public void onAuthenticationSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) throws IOException, ServletException {

		CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
		String uniqueId = oAuth2User.getName();
		String accessToken = jwtProvider.createAccessToken(uniqueId);
		String refreshToken = jwtProvider.createRefreshToken();

		redisService.setStringValue(refreshToken, uniqueId, jwtProvider.REFRESH_TOKEN_EXPIRE_TIME);
		response.sendRedirect("http://localhost:3000/auth/oauth-response?"
			+"access="+accessToken+"&"
			+"refresh="+refreshToken);
	}
}