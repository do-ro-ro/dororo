package com.dororo.api.commnunity.controller;

import com.dororo.api.commnunity.service.CommunityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Community", description = "커뮤니티 기능의 API 명세")
@RestController
@RequestMapping("/api/map-posts")
@RequiredArgsConstructor    // Autowired가 아닌 생성자를 통한 주입 방식 적용
public class CommunityController {
    
    private CommunityService communityService;

    // <-------------------- POST part -------------------->
    @Operation(summary = "커뮤니티 map post 생성 요청", description = "코스 공유를 했을 때 동작을 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "코스 공유 성공")
    })
    @PostMapping("")
    public ResponseEntity addPost() {

        return new ResponseEntity("temp", HttpStatus.CREATED);
    }

    // <-------------------- GET part -------------------->
    @Operation(summary = "커뮤니티 map post 상세 조회 요청", description = "커뮤니티에 등록된 map post의 상세 조회를 수행하는 API입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "코스 상세 조회 성공")
    })
    @GetMapping("/{mapId}")
    public ResponseEntity getPost(@PathVariable Integer mapId) {

        return new ResponseEntity("temp", HttpStatus.OK);
    }

}
