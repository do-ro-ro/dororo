package com.dororo.api.commnunity.service;

import com.dororo.api.commnunity.dto.response.GetPostDetailsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommunityService {

    public void addPost() {

    }

    public GetPostDetailsDto postDetails() {
        GetPostDetailsDto getPostDetailsDto = new GetPostDetailsDto();

        return getPostDetailsDto;
    }

}
