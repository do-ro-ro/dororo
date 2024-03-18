package com.dororo.api.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dororo.api.db.entity.LinkEntity;

@Repository
public interface LinkRepository extends JpaRepository<LinkEntity, Integer> {
}
