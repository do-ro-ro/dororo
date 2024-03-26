package com.dororo.api.user.provider;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
	@Value("${secret-key}")
	private String secretKey;
	public static final long ACCESS_TOKEN_EXPIRE_TIME = 1 * 60 * 60 * 1000L; //액세스 토큰 1시간
	public static final long REFRESH_TOKEN_EXPIRE_TIME = 28 * 24 * 60 * 60 * 1000L;     // 리프레시 토큰 4주
	public String createAccessToken (String userId) { // 로그인 시 토큰 발급
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)); //시크릿 키 만들기

		Date now = new Date();
		String jwt = Jwts.builder()
			.signWith(key, SignatureAlgorithm.HS256)
			.setSubject(userId)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_TIME))
			.compact();

		return jwt;
	}
	public String createRefreshToken() {
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)); //시크릿 키 만들기

		Date now = new Date();
		String jwt = Jwts.builder()
			.signWith(key, SignatureAlgorithm.HS256)
			.setIssuedAt(new Date())
			.setExpiration(new Date(now.getTime() + REFRESH_TOKEN_EXPIRE_TIME))
			.compact();

		return jwt;
	}
	public String validate (String jwt) {
		String subject = null;
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

		try {
			subject = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(jwt)
				.getBody()
				.getSubject();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}

		return subject;
	}
}