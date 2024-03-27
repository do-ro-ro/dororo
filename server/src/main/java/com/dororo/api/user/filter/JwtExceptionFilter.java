package com.dororo.api.user.filter;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dororo.api.exception.NoTokenInHeaderException;
import com.dororo.api.exception.RefreshRequiredException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		try{
			filterChain.doFilter(request, response);
		} catch (NoTokenInHeaderException e) {
			response.setStatus(HttpStatus.BAD_REQUEST.value());
			response.getWriter().write(e.getMessage());
		} catch (RefreshRequiredException e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.getWriter().write(e.getMessage());
		}
	}
}
