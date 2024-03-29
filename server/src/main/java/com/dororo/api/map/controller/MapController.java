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
    public ResponseEntity getAllMaps(@RequestParam(value = "map-type" ,required = false)  MapEntity.Maptype maptype ,
                                     @RequestHeader("access")  String access) {
        System.out.println("전체 조회 컨트롤러 호출");
        List<MapResponseDto> maps = mapService.getAllMaps(maptype,access);
        return ResponseEntity.ok(maps);
    }

    //맵 상세조회
    @GetMapping("/{mapId}")
    public ResponseEntity getMapdetails(@PathVariable(name="mapId") Integer mapId,
                                        @RequestHeader("access") String access) {
        DetailMapResponseDto detailMapResponseDto = mapService.getMapById(mapId,access);
        System.out.println("디테일 mapId :" + mapId);

        return new ResponseEntity(detailMapResponseDto, HttpStatus.OK);
    }

    //맵 생성(샘플)
    @PostMapping("")
    public ResponseEntity createMap(@RequestBody CreateMapRequestDto createMapRequestDto,
                                    @RequestHeader("access") String access) {
        List<CreateMapResponseDto>  createMapList =  mapService.createMapSample(createMapRequestDto,access);

        return new ResponseEntity(createMapList, HttpStatus.CREATED);
    }
// 찐 맵 생성
//    @PostMapping("")
//    public ResponseEntity createMap(@RequestBody CreateMapRequestDto createMapRequestDto,
//                                    @RequestHeader("access") String access) {
//        List<CreateMapResponseDto>  createMapList =  mapService.createMapSample(createMapRequestDto,access);
//
//        return new ResponseEntity(createMapList, HttpStatus.CREATED);
//    }
    //맵 저장
    @PostMapping("/save")
    public ResponseEntity saveMap(@RequestBody AddMapRequestDto addMapRequestDto,
                                  @RequestHeader("access") String access) {
        mapService.saveMap(addMapRequestDto,access);
        return ResponseEntity.ok().body("Map saved successfully");
    }

    //맵 삭제
    @DeleteMapping("/{mapId}")
    public ResponseEntity deleteMap(@PathVariable(name = "mapId") Integer mapId,
                                    @RequestHeader("access") String access) {
        mapService.deleteMapById(mapId,access);
        return ResponseEntity.ok().build();
    }


    //맵 수정 (주행여부 갱신)
    @PatchMapping("/{mapId}")
    public ResponseEntity updateMap(@PathVariable(name = "mapId") Integer mapId ,
                                    @RequestBody UpdateRequestDto updateRequestDto,
                                    @RequestHeader("access") String access) {
        mapService.updateMapCompletion(mapId,updateRequestDto,access);
        return ResponseEntity.ok().build(); // 업데이트 성공 응답
    }


}