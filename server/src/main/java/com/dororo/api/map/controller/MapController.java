package com.dororo.api.map.controller;


import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.map.dto.MapResponseDto;
import com.dororo.api.map.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MapController {
    @Autowired
    private MapService mapService;


    @GetMapping("/maps")
    public List<MapResponseDto> getAllMaps(@RequestParam("map-type") MapEntity.Maptype maptype){
        return mapService.getAllMaps(maptype);
    }
}
