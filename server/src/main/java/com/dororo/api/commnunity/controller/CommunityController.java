package com.dororo.api.commnunity.controller;

import com.dororo.api.commnunity.dto.request.AddPostDto;
import com.dororo.api.commnunity.dto.response.PostDetailsDto;
import com.dororo.api.commnunity.service.CommunityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Community", description = "커뮤니티 기능의 API 명세")
@RestController
@RequestMapping("/api/map-posts")
@RequiredArgsConstructor    // Autowired가 아닌 생성자를 통한 주입 방식 적용
public class CommunityController {
    
    private final CommunityService communityService;

    // <-------------------- POST part -------------------->
    @Operation(summary = "커뮤니티 map post 생성 요청", description = "코스 공유를 했을 때 동작을 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "코스 공유 성공")
    })
    @PostMapping("")
    public ResponseEntity addPost(@RequestBody AddPostDto addPostDto) {
        communityService.addPost(addPostDto);

        return new ResponseEntity("temp", HttpStatus.CREATED);
    }

    // <-------------------- GET part -------------------->
    @Operation(summary = "커뮤니티 map post 전체 조회 요청", description = "커뮤니티에 등록된 map post의 전체 조회를 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "코스 전체 조회 성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = PostDetailsDto.class)))),
    })
    @GetMapping("")
    public ResponseEntity postList() {
        List<PostDetailsDto> postDetailsDtoList = communityService.postList();

        return new ResponseEntity(postDetailsDtoList, HttpStatus.OK);
    }

    @Operation(summary = "커뮤니티 map post 상세 조회 요청", description = "커뮤니티에 등록된 map post의 상세 조회를 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "코스 상세 조회 성공",
                    content = @Content(schema = @Schema(implementation = PostDetailsDto.class))),
            @ApiResponse(responseCode = "401", description = "요청 받은 post의 ID로 게시글 조회 불가")
    })
    @GetMapping("/{postId}")
    public ResponseEntity postDetails(@Parameter(in = ParameterIn.PATH) @PathVariable Integer postId) {
        PostDetailsDto postDetailsDto = communityService.postDetails(postId);

        return new ResponseEntity(postDetailsDto, HttpStatus.OK);
    }

    // <-------------------- DELETE part -------------------->
    @Operation(summary = "커뮤니티 map post 삭제 요청", description = "커뮤니티에 등록된 map post의 삭제를 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "코스 상세 조회 성공")
    })
    @DeleteMapping("/{postId}")
    public ResponseEntity deletePost(@Parameter(in = ParameterIn.PATH) @PathVariable Integer postId) {
        PostDetailsDto postDetailsDto = communityService.postDetails(postId);

        return new ResponseEntity(postDetailsDto, HttpStatus.OK);
    }

}
