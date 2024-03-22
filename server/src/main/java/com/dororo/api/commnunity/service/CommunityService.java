package com.dororo.api.commnunity.service;

import com.dororo.api.commnunity.dto.request.AddPostDto;
import com.dororo.api.commnunity.dto.response.PostDetailsDto;
import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.entity.PostEntity;
import com.dororo.api.db.repository.PostRepository;
import com.dororo.api.exception.NoMatchingResourceException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final ModelMapper modelMapper;    // Entity -> Dto 간 변환에 사용
    private final PostRepository postRepository;

    // <------------------------ POST part ------------------------>
    public void addPost(AddPostDto addPostDto) {
        Integer mapId = addPostDto.getMapId();  // 참조하는 맵의 ID
        PostEntity postEntity = PostEntity.builder()
                .mapId(new MapEntity()) // MapRepository 메서드 선언 전 임시 처리
                .postTitle(addPostDto.getPostTitle())
                .postContent(addPostDto.getPostContent())
                .reviewRef(addPostDto.getReviewRef())
                .build();

        postRepository.save(postEntity);
    }

    // <------------------------ GET part ------------------------>
    public PostDetailsDto postDetails(Integer postId) {
        Optional<PostEntity> tempPostEntity = postRepository.findByPostId(postId);  // 존재하는지 체크하기 위해 Optional 객체로 생성
        if (!tempPostEntity.isPresent()) throw new NoMatchingResourceException("해당하는 게시글이 존재하지 않습니다.");

        PostEntity postEntity = tempPostEntity.get();   // Optional 객체가 존재한다면 get() 메서드로 실제 엔티티 받기

        return modelMapper.map(postEntity, PostDetailsDto.class);
    }

    // <------------------------ Common method part ------------------------>

}
