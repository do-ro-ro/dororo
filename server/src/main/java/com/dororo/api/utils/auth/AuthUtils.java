package com.dororo.api.utils.auth;

import com.dororo.api.db.entity.UserEntity;
import com.dororo.api.db.repository.UserRepository;
import com.dororo.api.user.provider.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Component
@AllArgsConstructor
public class AuthUtils {

    private final JwtProvider jwtProvider;

    private final UserRepository userRepository;

    public String getUserUniqueIdFromAccess(String access) {
        String userUniqueId = jwtProvider.getTokenSubject(access);

        return userUniqueId;
    }

    //userId 알아내기 위해 userEntity 반환
    public UserEntity getUserEntityFromAccess(String access) {
        String userUniqueId = jwtProvider.getTokenSubject(access);
        Optional<UserEntity> userEntity = userRepository.findByUniqueId(userUniqueId);

        // 사용자 엔티티가 없는 경우 적절한 예외 처리
        return userEntity.orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
