package com.dororo.api.convert;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;

import java.util.List;

//(위도,경도) 데이터를 바이너리 형식으로 변환
// DB 에 저장할때
public class LatLonToBinary {

    // 위도와 경도의 리스트를 LineString 객체로 변환하는 메서드
    public LineString createLineStringFromCoordinates(List<Coordinate> coordinates) {
        GeometryFactory factory = new GeometryFactory();
        LineString lineString = factory.createLineString(coordinates.toArray(new Coordinate[0]));
        return lineString;
    }
}
