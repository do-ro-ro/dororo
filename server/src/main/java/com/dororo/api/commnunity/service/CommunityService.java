package com.dororo.api.commnunity.service;

import com.dororo.api.commnunity.dto.request.AddPostDto;
import com.dororo.api.commnunity.dto.response.PostDetailsDto;
import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.entity.PostEntity;
import com.dororo.api.db.repository.MapRepository;
import com.dororo.api.db.repository.PostRepository;
import com.dororo.api.exception.NoMatchingResourceException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final ModelMapper modelMapper;    // Entity -> Dto 간 변환에 사용
    private final PostRepository postRepository;
    private final MapRepository mapRepository;


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

    public void scrapPost(Integer postId) {
        PostEntity postEntity = findPostInDataBaseByPostId(postId);
        MapEntity originMapEntity = postEntity.getMapId();
        makeScrapMap(originMapEntity);  // 우선은 setter를 이용한 메서드로 새로운 맵 저장 함수 구현한 것을 사용함
    }

    // <------------------------ GET part ------------------------>
    public List<PostDetailsDto> postList(String option) {
        String userUniqueId = "Get Unique ID at JWT";   // 아직 엑세스 토큰 도입 안해서 이렇게 둠
        List<PostEntity> userPostEntityList;
        if (option == null) userPostEntityList = postRepository.findAll();  // option query 없이 요청이 들어왔을 경우 전체 게시글 조회
        else userPostEntityList = postRepository.findByWriterUniqueId(userUniqueId); // option query와 함께 요청이 들어왔을 경우, 사용자 unique id 기반으로 게시글 조회
        List<PostDetailsDto> postDetailsDtoList = userPostEntityList.stream()    // DB에서 꺼낸 Entity에 대해 stream을 이용,
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

    // <------------ For Readability ------------>
    private void makeScrapMap(MapEntity originMapEntity) {   // 스크랩하여 유저에게 맵을 저장하는 함수, 일단 MapEntity 저장 방식이 Setter이므로 여기서도 Setter로 하지만, 바뀌면 좋을 듯
        MapEntity scrapMapEntity = new MapEntity();
        scrapMapEntity.setUserId(originMapEntity.getUserId());
        scrapMapEntity.setMapName(originMapEntity.getMapName());
        scrapMapEntity.setMapRouteAxis(originMapEntity.getMapRouteAxis());
        scrapMapEntity.setMapType(MapEntity.Maptype.SCRAP); // 스크랩한 맵임을 타입으로 명시
        scrapMapEntity.setMapDistance(originMapEntity.getMapDistance());
        scrapMapEntity.setMapCompletion(false); // 맵 생성과 같으므로 주행 여부는 false로

        mapRepository.save(scrapMapEntity);
    }

}