import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function Map({ lat, lon }) {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [courseLine, setCourseLine] = useState(null);

    // 지도 초기화
    const initMap = () => {
        const newMap = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(lat, lon),
            width: "100vw",
            height: "80vh",
            zoom: 14,
        });
        setMap(newMap);

        // 초기 경로와 마커 생성
        updateMap(newMap, [
            new window.Tmapv2.LatLng(lat, lon),
            new window.Tmapv2.LatLng(lat + 0.01, lon + 0.01),
            // 추가 꼭지점은 여기에
        ]);
    };

    // 지도 업데이트 (경로 및 마커)
    const updateMap = (map, pathPoints) => {
        // 기존 마커 제거
        markers.forEach((marker) => marker.setMap(null));

        // 새 마커와 경로 생성
        const newMarkers = pathPoints.map((point, index) => {
            const marker = new window.Tmapv2.Marker({
                position: point,
                map: map,
                draggable: true,
            });

            // 드래그 이벤트 리스너
            window.Tmapv2.Event.addListener(marker, "dragend", function (evt) {
                const newPosition = evt.latLng;
                const updatedPathPoints = [...pathPoints];
                updatedPathPoints[index] = newPosition;
                updateMap(map, updatedPathPoints); // 마커 이동 후 경로 업데이트
            });

            return marker;
        });
        setMarkers(newMarkers);

        // 경로 업데이트
        if (courseLine) {
            courseLine.setMap(null); // 기존 경로 제거
        }
        const newCourseLine = new window.Tmapv2.Polyline({
            path: pathPoints,
            strokeColor: "#dd00dd",
            strokeWeight: 6,
            map: map,
        });
        setCourseLine(newCourseLine);
    };

    useEffect(() => {
        initMap();
    }, [lat, lon]); // lat, lon이 변경되면 지도를 초기화합니다.

    return (
        <>
            <Box>
                <div id="map_div">
                    <Box position={"fixed"}>
                        <Button>수정 완료</Button>
                    </Box>
                </div>
            </Box>
        </>
    );
}

export default Map;
