package com.dororo.api.commnunity.controller;

import com.dororo.api.commnunity.service.CommunityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Community", description = "커뮤니티 기능의 API 명세")
@RestController
@RequestMapping("/api/map-posts")
@RequiredArgsConstructor    // Autowired가 아닌 생성자를 통한 주입 방식 적용
public class CommunityController {
    
    private CommunityService communityService;

    @PostMapping("")
    public ResponseEntity addPosts() {

        return new ResponseEntity("temp", HttpStatus.CREATED);
    }

}
