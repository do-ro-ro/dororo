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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final ModelMapper modelMapper;    // Entity -> Dto 간 변환에 사용
    private final PostRepository postRepository;

    // <------------------------ POST part ------------------------>
    public PostEntity addPost(AddPostDto addPostDto) {
        Integer mapId = addPostDto.getMapId();  // 참조하는 맵의 ID
        PostEntity postEntity = PostEntity.builder()
                .mapId(new MapEntity()) // MapRepository 메서드 선언 전 임시 처리
                .postTitle(addPostDto.getPostTitle())
                .postContent(addPostDto.getPostContent())
                .reviewRef(addPostDto.getReviewRef())
                .build();
        PostEntity savedPost = postRepository.save(postEntity);

        return savedPost;
    }

    // <------------------------ GET part ------------------------>
    public List<PostDetailsDto> postList(String option) {
        List<PostEntity> userPostListEntity;
        if (option == null) userPostListEntity = postRepository.findAll();  // option query 없이 요청이 들어왔을 경우 전체 게시글 조회
        else userPostListEntity = postRepository.findByUserId("temp"); // option query와 함께 요청이 들어왔을 경우, 사용자 id 기반으로 게시글 조회(아직 엑세스 토큰 도입 안해서 temp로 둠)
        List<PostDetailsDto> postDetailsDtoList = userPostListEntity.stream()    // DB에서 꺼낸 Entity에 대해 stream을 이용,
                .map(m -> modelMapper.map(m, PostDetailsDto.class)) // Entity -> Dto 변환
                .collect(Collectors.toList());

        return postDetailsDtoList;
    }

    public PostDetailsDto postDetails(Integer postId) {
        PostEntity postEntity = findPostInDataBaseByPostId(postId);

        return modelMapper.map(postEntity, PostDetailsDto.class);
    }

    // <------------------------ DELETE part ------------------------>
    public void deletePost(Integer postId) {
        PostEntity postEntity = findPostInDataBaseByPostId(postId);
        postRepository.delete(postEntity);  // deleteById(postId)를 써도 되지만 위의 메서드에서 객체가 있는지 확인 했고, 있다면 이미 메모리에 객체가 로드 됐으므로 delete(postEntity)를 사용했음
    }

    // <------------------------ Common method part ------------------------>
    // <------------ For Error Handling ------------>
    private PostEntity findPostInDataBaseByPostId(Integer postId) {
        Optional<PostEntity> tempPostEntity = postRepository.findByPostId(postId);  // 존재하는지 체크하기 위해 Optional 객체로 생성
        if (!tempPostEntity.isPresent()) throw new NoMatchingResourceException("No Content");

        return tempPostEntity.get();   // Optional 객체가 존재한다면 get() 메서드로 실제 엔티티 받기
    }


}
