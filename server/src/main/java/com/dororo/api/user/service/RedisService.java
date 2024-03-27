package com.dororo.api.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {

	@Autowired
	private final StringRedisTemplate stringRedisTemplate;

	public List<String> getListValue(String refreshToken) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		String providerUserId = stringValueOperations.get(refreshToken);
		List<String> findInfo = new ArrayList<>();
		findInfo.add(providerUserId);
		findInfo.add(refreshToken);

		return findInfo;
	}

	public String getStringValue(String accessToken) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		String accessTokenValue = stringValueOperations.get(accessToken);
		if(accessTokenValue == null) {
			return null;
		}

		return accessToken;
	}

	public void setStringValue(String token, String data, Long expirationTime) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		stringValueOperations.set(token, data, expirationTime, TimeUnit.MILLISECONDS);
	}

	public void deleteKey(String refreshToken) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		stringValueOperations.getAndDelete(refreshToken);
	}
}