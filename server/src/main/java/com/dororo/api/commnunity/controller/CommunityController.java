package com.dororo.api.commnunity.controller;

import com.dororo.api.commnunity.dto.request.AddPostDto;
import com.dororo.api.commnunity.dto.response.PostDetailsDto;
import com.dororo.api.commnunity.service.CommunityService;
import com.dororo.api.db.entity.PostEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Tag(name = "Community", description = "커뮤니티 기능의 API 명세")
@RestController
@RequestMapping("/api/map-posts")
@RequiredArgsConstructor    // Autowired가 아닌 생성자를 통한 주입 방식 적용
public class CommunityController {
    
    private final CommunityService communityService;

    @Operation(summary = "커뮤니티 map post 생성 요청", description = "코스 공유를 했을 때 동작을 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "코스 공유 성공",
                    content = @Content(examples = {
                                    @ExampleObject(
                                            name = "Post 생성 반환 body",
                                            summary = "Post 생성 반환 body의 예시",
                                            value = "{\"id\": 1, \"postTitle\": \"새로운 포스트\", \"_links\": {\"postDetails\": {\"href\": \"https://j10e202.p.ssafy.io/api/map-posts/1\"}}}"
                                    )
                            }
                    ))
    })
    @PostMapping("")
    public ResponseEntity addPost(@RequestBody AddPostDto addPostDto) {
        PostEntity savedPost = communityService.addPost(addPostDto);

        return new ResponseEntity(EntityModel.of(savedPost, linkTo(methodOn(CommunityController.class).postDetails(savedPost.getPostId())).withRel("postDetails")), HttpStatus.CREATED);
    }
    // <-------------------- POST part -------------------->

    // <-------------------- GET part -------------------->
    @Operation(summary = "커뮤니티 map post 전체 조회 요청", description = "커뮤니티에 등록된 map post의 전체 조회를 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "코스 전체 조회 성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = PostDetailsDto.class)), examples = {
                            @ExampleObject(
                                    name = "Post 전체 조회 body",
                                    summary = "Post 전체 조회 body의 예시",
                                    value = "[{\"postId\": 1, \"mapId\": 1, \"mapImage\": \"https://~~~/temp.png\", \"userName\": \"김영후\", \"createdAt\": \"YYYY-MM-DD hh:mm:ss.000000\", \"scrapCount\": 0, " +
                                            "\"postTitle\": \"게시글 1\", \"postContent\": \"게시글 1의 내용\", \"mapRouteAxis\": \"아직 잘 모름\"}]"
                            )
                    })),
    })
    @GetMapping("")
    public ResponseEntity postList(@Parameter(name = "option", description = "조회의 옵션(전체 조회 시 그냥 /map-posts 로 요청, 내가 쓴 게시글의 경우 /map-posts?option=mine 으로 요청", in = ParameterIn.QUERY)
                                       @RequestParam(required = false) String option) {
        List<PostDetailsDto> postDetailsDtoList = communityService.postList(option);

        return new ResponseEntity(postDetailsDtoList, HttpStatus.OK);
    }

    @Operation(summary = "커뮤니티 map post 상세 조회 요청", description = "커뮤니티에 등록된 map post의 상세 조회를 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "코스 상세 조회 성공",
                    content = @Content(schema = @Schema(implementation = PostDetailsDto.class), examples = {
                            @ExampleObject(
                                    name = "Post 상세 조회 body",
                                    summary = "Post 상세 조회 body의 예시",
                                    value = "{\"postId\": 1, \"mapId\": 1, \"mapImage\": \"https://~~~/temp.png\", " +
                                            "\"userName\": \"김영후\", \"createdAt\": \"YYYY-MM-DD hh:mm:ss.000000\", \"scrapCount\": 0," +
                                            " \"postTitle\": \"게시글 1\", \"postContent\": \"게시글 1의 내용\", \"mapRouteAxis\": \"아직 잘 모름\"}"
                            )
                    })),
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
            @ApiResponse(responseCode = "200", description = "코스 삭제 성공", content = @Content(examples = {
                    @ExampleObject(
                            name = "Post 삭제 body",
                            summary = "Post 삭제 body의 예시",
                            value = " "
                    )
            }))
    })
    @DeleteMapping("/{postId}")
    public ResponseEntity deletePost(@Parameter(in = ParameterIn.PATH) @PathVariable Integer postId) {
        communityService.deletePost(postId);

        return new ResponseEntity(HttpStatus.OK);
    }

}
