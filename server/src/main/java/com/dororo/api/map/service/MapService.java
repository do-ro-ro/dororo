package com.dororo.api.map.service;

import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.db.repository.MapRepository;
import com.dororo.api.map.dto.MapResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapService {

    @Autowired
    private MapRepository mapRepository;

    public List<MapResponseDto> getAllMaps(MapEntity.Maptype maptype) {
        List<MapEntity> maps = mapRepository.findAll();

        //로직구현
        List<MapResponseDto> lists = null;
        return lists;
    }
}
