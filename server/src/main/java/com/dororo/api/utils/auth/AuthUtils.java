package com.dororo.api.utils.auth;

import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.user.provider.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AuthUtils {

    private final JwtProvider jwtProvider;

    public String getUserUniqueIdFromAccess(String access) {
        String userUniqueId = jwtProvider.getTokenSubject(access);
        System.out.println(userUniqueId);

        return userUniqueId;
    }

}
