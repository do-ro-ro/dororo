package com.dororo.api.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dororo.api.db.entity.PostEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Integer> {

    Optional<PostEntity> findByPostId(Integer postId);  // isPresent() 메서드 사용을 통한 예외 처리를 위해 Optional type으로 선언
    List<PostEntity> findByWriterUniqueId(String uniqueId);   // user의 unique ID로 post 리스트 조회

}
