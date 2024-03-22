package com.dororo.api.commnunity.service;

import com.dororo.api.commnunity.dto.response.GetPostDetailsDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommunityService {

    @Autowired
    ModelMapper modelMapper;    // Entity -> Dto 간 변환에 사용

    public void addPost() {

    }

    public GetPostDetailsDto postDetails() {
        GetPostDetailsDto getPostDetailsDto = new GetPostDetailsDto();

        return getPostDetailsDto;
    }

}
