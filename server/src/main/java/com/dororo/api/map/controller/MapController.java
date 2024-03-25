package com.dororo.api.map.controller;


import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.map.dto.AddMapRequestDto;
import com.dororo.api.map.dto.DetailMapResponseDto;
import com.dororo.api.map.dto.MapResponseDto;
import com.dororo.api.map.service.MapService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
public class MapController {
    @Autowired
    private MapService mapService;

    //맵 전체 조회(map-type별로)
    @GetMapping("/maps")
    public ResponseEntity getAllMaps(@RequestParam("map-type") MapEntity.Maptype maptype) {
        List<MapResponseDto> maps = mapService.getAllMaps(maptype);
        return ResponseEntity.ok(maps);
    }

    //맵 상세조회
    @GetMapping("/maps/{mapId}")
    public ResponseEntity getMapdetails(@PathVariable Integer mapId) {
        DetailMapResponseDto detailMapResponseDto = mapService.getMapById(mapId);
        return ResponseEntity.ok(detailMapResponseDto);
    }

    //맵 생성
    @PostMapping("/maps")
    public ResponseEntity addMap(@RequestBody AddMapRequestDto addMapRequestDto) {

        return ResponseEntity.ok(HttpStatus.OK);
    }

    //맵 저장
    @PostMapping("/maps/save")
    public ResponseEntity saveMap() {

        return ResponseEntity.ok(HttpStatus.OK);
    }

    //맵 삭제
    @DeleteMapping("/maps/{mapId}")
    public ResponseEntity deleteMap(@PathVariable Integer mapId) {
        mapService.deleteMapById(mapId);
        return ResponseEntity.ok().build();
    }


    //맵 수정 (주행여부 갱신)
    @PatchMapping("/maps/{mapId}")
    public ResponseEntity updateMap(@PathVariable Integer mapId ,  @RequestParam("map-completion") Boolean mapCompletion) {
        mapService.updateMapCompletion(mapId, mapCompletion);
        return ResponseEntity.ok().build(); // 업데이트 성공 응답
    }


}