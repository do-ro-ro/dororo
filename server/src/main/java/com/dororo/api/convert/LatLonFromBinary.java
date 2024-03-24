package com.dororo.api.convert;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;

import java.util.List;

//바이너리 형식으로 된 DB의 데이터를 (위도 , 경도 ) 로 변환
//데이터를 가져와서 (위도,경도) 로 사용할때
public class LatLonFromBinary {

    // 위도와 경도의 리스트를 LineString 객체로 변환하는 메서드
    public static LineString createLineStringFromLatLon(List<Double[]> latLonList) {
        GeometryFactory factory = new GeometryFactory();
        // 순서 주의: (경도, 위도) coordinate 객체가 (x,y)를 받는데 x가 경도라네요
        Coordinate[] coordinates = latLonList.stream()
                .map(latLon -> new Coordinate(latLon[1], latLon[0]))
                .toArray(Coordinate[]::new);
        return factory.createLineString(coordinates);
    }
}
