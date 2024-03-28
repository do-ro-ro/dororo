package com.dororo.api.utils.auth;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import com.dororo.api.auth.provider.JwtProvider;

@Component
@AllArgsConstructor
public class AuthUtils {

    private final JwtProvider jwtProvider;

    public String getUserUniqueIdFromAccess(String access) {
        String userUniqueId = jwtProvider.getTokenSubject(access);

        return userUniqueId;
    }

}
