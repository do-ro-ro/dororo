package com.dororo.api.User.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.dororo.api.User.provider.JwtProvider;
import com.dororo.api.db.entity.CustomOAuth2User;

import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtProvider jwtProvider;

	@Override
	public void onAuthenticationSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) throws IOException, ServletException {

		CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
		String uniqueId = oAuth2User.getName();
		String token = jwtProvider.create(uniqueId);

		response.sendRedirect("http://localhost:3000/auth/oauth-response/"+token+"/3600");
	}
}