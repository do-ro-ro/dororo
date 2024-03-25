package com.dororo.api.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dororo.api.db.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	Optional<UserEntity> findByUniqueId(String uniqueId);
	Optional<UserEntity> findByUserId(Integer userId);
	Optional<UserEntity> findByNickname(String nickname);
}
