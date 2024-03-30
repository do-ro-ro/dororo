package com.dororo.api.map.controller;


import com.dororo.api.db.entity.MapEntity;
import com.dororo.api.map.dto.*;
import com.dororo.api.map.service.MapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/maps")
@Tag(name = "Map", description = "맵 기능의 API 명세" )
public class MapController {
    @Autowired
    private MapService mapService;

    //맵 전체 조회(map-type별로)
    @Operation(summary = "로그인 한 유저의 맵리스트 조회", description = "마이페이지에서 사용할 맵 조회 API 입니다")
    @ApiResponses({

            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = MapResponseDto.class),
                            examples = {
                                    @ExampleObject(
                                            name = "성공 예시",
                                            summary = "성공 시 반환되는 데이터 예시",
                                            description = "MapResponseDto 반환 .",
                                            value = "{\"mapId\": 1, \"mapName\": \"테스트 맵\", \"mapImage\": \"http://example.com/image.png\", \"originMapRouteAxis\": [{\"lat\": 35.093481367865145, \"lng\": 128.85411060747438}], \"convertedRouteAxis\": [{\"lat\": 35.09358136786515, \"lng\": 128.85391060747438}], \"mapType\": \"DEFAULT\", \"mapDistance\": 5.0, \"originalMapId\": 0, \"mapCompletion\": false}"
                                    )
                            }
                    )
            ),
            @ApiResponse(responseCode = "400", description = "요청에 필요한 헤더(액세스 토큰)가 없음",
                    content = @Content(schema = @Schema(example = "No token in header."))),
            @ApiResponse(responseCode = "401", description = "액세스 토큰 만료 or 형식 안맞음",
                    content = @Content(schema = @Schema(example = "Get new AccessToken")))
    })
    @GetMapping("")
    public ResponseEntity getAllMaps(@Parameter(name = "map-type", description = "조회의 옵션(전체 조회 시 그냥 api/maps 로 GET요청, map-type = { DEFAULT | CUSTOM | SCRAP }", in = ParameterIn.QUERY) @RequestParam(value = "map-type" ,required = false)  MapEntity.Maptype maptype ,
                                     @Parameter(name = "access", description = "액세스 토큰", in = ParameterIn.HEADER) @RequestHeader("access")  String access) {
        System.out.println("전체 조회 컨트롤러 호출");
        List<MapResponseDto> maps = mapService.getAllMaps(maptype,access);
        return ResponseEntity.ok(maps);
    }

    //맵 상세조회
    @Operation(summary = "특정 맵 상세 조회", description = "mapId 로 상세조회를 합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = DetailMapResponseDto.class),
                            examples = {
                                    @ExampleObject(
                                            name = "성공 예시",
                                            summary = "성공 시 반환되는 데이터 예시",
                                            description = "DetailMapResponseDto 반환 .",
                                            value = "{\n" +
                                                    "    \"mapId\": 1,\n" +
                                                    "    \"mapName\": \"테스트 맵\",\n" +
                                                    "    \"mapImage\": \"http://example.com/image.png\",\n" +
                                                    "    \"originMapRouteAxis\": [\n" +
                                                    "        {\"lat\": 35.093481367865145, \"lng\": 128.85411060747438}\n" +
                                                    "    ],\n" +
                                                    "    \"convertedRouteAxis\": [\n" +
                                                    "        {\"lat\": 35.09358136786515, \"lng\": 128.85391060747438}\n" +
                                                    "    ],\n" +
                                                    "    \"mapType\": \"DEFAULT\",\n" +
                                                    "    \"mapDistance\": 5.0,\n" +
                                                    "    \"originalMapId\": 0,\n" +
                                                    "    \"mapCompletion\": false\n" +
                                                    "}"
                                    )
                            }
                    )
            ),
            @ApiResponse(responseCode = "400", description = "요청에 필요한 헤더(액세스 토큰)가 없음",
                    content = @Content(schema = @Schema(example = "No token in header."))),
            @ApiResponse(responseCode = "401", description = "액세스 토큰 만료 or 형식 안맞음",
                    content = @Content(schema = @Schema(example = "Get new AccessToken")))
    })
    @GetMapping("/{mapId}")
    public ResponseEntity getMapdetails(@PathVariable(name="mapId") Integer mapId,
                                        @RequestHeader("access") String access) {
        DetailMapResponseDto detailMapResponseDto = mapService.getMapById(mapId,access);
        System.out.println("디테일 mapId :" + mapId);

        return new ResponseEntity(detailMapResponseDto, HttpStatus.OK);
    }


    @Operation(summary = "맵 추천알고리즘으로 맵 경로리스트 생성", description = "경로생성하여 유저에게 10개의 리스트를 보여줍니다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "맵 추천 로직 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CreateMapResponseDto.class)),
                            examples = @ExampleObject(
                                    name = "성공 예시",
                                    summary = "성공 시 반환되는 List<CreateMapResponseDto> 예시",
                                    description = "CreateMapResponseDto 리스트 반환 예시.",
                                    value = "[" +
                                            "{" +
                                            "    \"originMapRouteAxis\": [{\"lat\": 35.093481367865145, \"lng\": 128.85411060747438}]," +
                                            "    \"convertedRouteAxis\": [{\"lat\": 35.09358136786515, \"lng\": 128.85391060747438}]," +
                                            "    \"mapDistance\": 5.0" +
                                            "}" +
                                            "]"
                            )
                    )
            ),
            @ApiResponse(responseCode = "400", description = "요청에 필요한 헤더(액세스 토큰)가 없음",
                    content = @Content(schema = @Schema(example = "No token in header."))),
            @ApiResponse(responseCode = "401", description = "액세스 토큰 만료 or 형식 안맞음",
                    content = @Content(schema = @Schema(example = "Get new AccessToken")))
    })
    @PostMapping("")
    public ResponseEntity createMap(@RequestBody CreateMapRequestDto createMapRequestDto,
                                    @RequestHeader("access") String access) {
        List<CreateMapResponseDto>  createMapList =  mapService.createMap(createMapRequestDto,access);

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
    public ResponseEntity saveMap(@RequestPart(value= "request") AddMapRequestDto addMapRequestDto,
                                  @RequestPart(value= "mapImage") MultipartFile mapImage,
                                  @RequestHeader("access") String access) {
        mapService.saveMap(addMapRequestDto,access, mapImage);
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