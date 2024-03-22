package com.dororo.api.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dororo.api.db.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	UserEntity findByUniqueId(String uniqueId);
	UserEntity findByUserId(Integer userId);
}
