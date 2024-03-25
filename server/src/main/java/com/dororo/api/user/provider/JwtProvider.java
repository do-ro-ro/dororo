package com.dororo.api.user.provider;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
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

	public String create (String userId) { // 로그인 시 토큰 발급
		Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS)); //기간 제한
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)); //시크릿 키 만들기

		String jwt = Jwts.builder()
			.signWith(key, SignatureAlgorithm.HS256)
			.setSubject(userId).setIssuedAt(new Date()).setExpiration(expiredDate)
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
				.parseClaimsJwt(jwt)
				.getBody()
				.getSubject();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}

		return "";
	}
}
