package com.dororo.api.convert;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;

import java.util.ArrayList;
import java.util.List;

public class ConvertUtils {
    private static final GeometryFactory geometryFactory = new GeometryFactory();

    // LineString을 LatitudeLongitude 리스트로 변환하는 유틸리티 메소드
    public static List<LatitudeLongitude> convertFromLineString(LineString lineString) {
        List<LatitudeLongitude> latLngList = new ArrayList<>();
        if (lineString != null) {
            for (Coordinate coord : lineString.getCoordinates()) {
                latLngList.add(new LatitudeLongitude(coord.y, coord.x)); // y가 위도, x가 경도
            }
        }
        return latLngList;
    }

    // 위도와 경도 리스트를 LineString으로 변환
    public static LineString convertToLineString(List<LatitudeLongitude> latLngList) {
        Coordinate[] coordinates = latLngList.stream()
                .map(latLng -> new Coordinate(latLng.getLng(), latLng.getLat()))
                .toArray(Coordinate[]::new);

        return geometryFactory.createLineString(coordinates);
    }

}
