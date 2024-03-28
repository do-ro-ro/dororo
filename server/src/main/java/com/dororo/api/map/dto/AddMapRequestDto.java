package com.dororo.api.map.dto;

import com.dororo.api.convert.LatitudeLongitude;
import com.dororo.api.db.entity.MapEntity;
import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AddMapRequestDto {

    private List<LatitudeLongitude> originMapRouteAxis;
    private List<LatitudeLongitude> convertedMapRouteAxis;
    private float mapDistance;
    private String mapName;
    private String mapImage;
    private MapEntity.Maptype mapType;

}
