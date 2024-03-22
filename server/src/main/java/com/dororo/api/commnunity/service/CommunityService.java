package com.dororo.api.commnunity.service;

import com.dororo.api.commnunity.dto.response.GetPostDetailsDto;
import com.dororo.api.db.repository.MapRepository;
import com.dororo.api.db.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final ModelMapper modelMapper;    // Entity -> Dto 간 변환에 사용
    private final PostRepository postRepository;
    private final MapRepository mapRepository;

    public void addPost() {

    }

    public GetPostDetailsDto postDetails() {
        GetPostDetailsDto getPostDetailsDto = new GetPostDetailsDto();

        return getPostDetailsDto;
    }

}
