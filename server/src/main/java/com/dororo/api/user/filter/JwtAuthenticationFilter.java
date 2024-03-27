package com.dororo.api.user.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dororo.api.exception.NoTokenInHeaderException;
import com.dororo.api.exception.RefreshRequiredException;
import com.dororo.api.user.provider.JwtProvider;
import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		try {
			String token = parseAccessToken(request);

			if(token == null){// 토큰 없음
				throw new NoTokenInHeaderException("No accessToken");
			}

			String userUniqueId = jwtProvider.validate(token);
			if(userUniqueId == null){// 토큰 만료
				throw new RefreshRequiredException();
			}

			Optional<UserEntity> userEntity = userRepository.findByUniqueId(userUniqueId);
			String role = userEntity.get().getRole(); //role : ROLE_USER

			List<GrantedAuthority> authorities = new ArrayList<>();
			authorities.add(new SimpleGrantedAuthority(role));

			SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
			AbstractAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(userUniqueId, null, authorities);
			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

			securityContext.setAuthentication(authenticationToken);
			SecurityContextHolder.setContext(securityContext);
		} catch (Exception exception) {
			exception.printStackTrace();
		}

		filterChain.doFilter(request, response);
	}

	private String parseAccessToken(HttpServletRequest request) {

		String accessToken = request.getHeader("access");
		//System.out.println("access: " + accessToken);

		boolean hasAccessToken = StringUtils.hasText(accessToken);
		if (!hasAccessToken)
			return null;

		return accessToken;
	}}