package com.dororo.api.map.controller;


import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.map.dto.*;
import com.dororo.api.map.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maps")
public class MapController {
    @Autowired
    private MapService mapService;

    //맵 전체 조회(map-type별로)
    @GetMapping("")
    public ResponseEntity getAllMaps(@RequestParam("map-type") MapEntity.Maptype maptype ,
                                     @RequestHeader("access") String token) {
        List<MapResponseDto> maps = mapService.getAllMaps(maptype,token);
        return ResponseEntity.ok(maps);
    }

    //맵 상세조회
    @GetMapping("/{mapId}")
    public ResponseEntity getMapdetails(@PathVariable(name="mapId") Integer mapId) {
        DetailMapResponseDto detailMapResponseDto = mapService.getMapById(mapId);
        System.out.println("디테일 mapId :" + mapId);
        // return ResponseEntity.ok(detailMapResponseDto);
        return new ResponseEntity(detailMapResponseDto, HttpStatus.OK);
    }

    //맵 생성
    @PostMapping("")
    public ResponseEntity createMap(@RequestBody CreateMapRequestDto createMapRequestDto) {
        List<CreateMapResponseDto>  createMapList =  mapService.createMap(createMapRequestDto);

        return new ResponseEntity(createMapList, HttpStatus.CREATED);
    }

    //맵 저장
    @PostMapping("/save")
    public ResponseEntity saveMap(@RequestBody AddMapRequestDto addMapRequestDto) {
        // DTO 검증 로직 << ? 이런것도 필요한가 예외처리 빼기.
        if (addMapRequestDto.getMapRouteAxis().isEmpty() || addMapRequestDto.getMapDistance() <= 0) {
            return ResponseEntity.badRequest().body("Invalid map data");
        }

        mapService.saveMap(addMapRequestDto);

        // 응답 반환
        return ResponseEntity.ok().body("Map saved successfully");
    }

    //맵 삭제
    @DeleteMapping("/{mapId}")
    public ResponseEntity deleteMap(@PathVariable(name = "mapId") Integer mapId) {
        mapService.deleteMapById(mapId);
        return ResponseEntity.ok().build();
    }


    //맵 수정 (주행여부 갱신)
    @PatchMapping("/{mapId}")
    public ResponseEntity updateMap(@PathVariable(name = "mapId") Integer mapId ,@RequestBody UpdateRequestDto updateRequestDto) {
        mapService.updateMapCompletion(mapId,updateRequestDto);
        return ResponseEntity.ok().build(); // 업데이트 성공 응답
    }


}