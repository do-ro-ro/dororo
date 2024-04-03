package com.dororo.api.convert;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Point;

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

    // Point를 LatitudeLongitude로 변환하는 유틸리티 메서드
    public static LatitudeLongitude convertToPointLatLng(Point point) {
        if (point != null) {
            double lat = point.getY(); // Point의 Y 좌표가 위도
            double lng = point.getX(); // Point의 X 좌표가 경도
            return new LatitudeLongitude(lat, lng);
        }
        return null; // Point가 null이면 null 반환
    }


}
