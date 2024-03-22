package com.dororo.api.User.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.dororo.api.User.filter.JwtAuthenticationFilter;
import com.dororo.api.User.handler.OAuth2SuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configurable
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final DefaultOAuth2UserService oAuth2UserService;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	@Bean
	protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {

		httpSecurity
			.cors(cors -> cors
				.configurationSource(corsConfigurationSource())
			)
			.csrf(CsrfConfigurer::disable)
			.httpBasic(HttpBasicConfigurer::disable)
			.sessionManagement(sessionManagement -> sessionManagement
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			.authorizeHttpRequests(request -> request
				.requestMatchers("/","/index.html", "/api/auth/**","/oauth2/**").permitAll()
				.requestMatchers("/api/docs", "/api/swagger-ui/**", "/v3/api-docs/**").permitAll()	// swagger에 대해 토큰 없이 요청해도 확인할 수 있도록 하는 설정
				.requestMatchers("/api/users/**").hasRole("USER")
				.requestMatchers("/api/maps/**").hasRole("USER")
				.requestMatchers("/api/map-posts/**").hasRole("USER")
				.anyRequest().authenticated()
			)
			.oauth2Login(oauth2 -> oauth2
				.authorizationEndpoint(endpoint -> endpoint.baseUri("/api/auth/oauth2"))
				.redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/callback/*"))
				.userInfoEndpoint(endpoint -> endpoint.userService(oAuth2UserService))
				.successHandler(oAuth2SuccessHandler)
			)
			.exceptionHandling(exceptionHandling -> exceptionHandling
				.authenticationEntryPoint(new FailedAuthenticationEntryPoint())
			)
			.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return httpSecurity.build();
	}

	@Bean
	protected CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.addAllowedOrigin("http://localhost:3000");
		corsConfiguration.addAllowedOrigin("https://j10e202.p.ssafy.io");
		corsConfiguration.addAllowedMethod("*");
		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.setAllowCredentials(true);	// 서버가 응답할 때 json을 JavaScript에서 처리할 수 있게 설정

		/*
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.addAllowedOrigin("*");
		corsConfiguration.addAllowedMethod("*");
		corsConfiguration.addAllowedHeader("*");
		*/

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);

		return source;
	}
}
class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException, ServletException {
		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.getWriter().write("{\"code\": \"NP\", \"message\": \"No Permission.\"}");
	}
}