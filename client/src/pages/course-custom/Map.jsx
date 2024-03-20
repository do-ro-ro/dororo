import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function Map({ course, lat, lng }) {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [courseLine, setCourseLine] = useState(null);
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);

    const startPoint = course[0];
    const endPoint = course[course.length - 1];

    // 지도 시작점을 위한 센터 포인트 정의
    const centerPoint = {
        lat: (startPoint.lat + endPoint.lat) / 2,
        lng: (startPoint.lng + endPoint.lng) / 2,
    };

    // 지도 초기화
    const initMap = () => {
        const newMap = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(centerPoint.lat, centerPoint.lng),

            // center: new window.Tmapv2.LatLng(lat, lon),

            width: "100vw",
            height: "80vh",
            zoom: 14,
        });

        setMap(newMap);

        // 출발점 설정
        const marker_s = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(startPoint.lat, startPoint.lng),
            icon: "/upload/tmap/marker/pin_r_m_s.png",
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_s]);

        //종착점 설정
        const marker_e = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(endPoint.lat, endPoint.lng),
            icon: "/upload/tmap/marker/pin_r_m_e.png",
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_e]);

        // 경유지 설정
        const waypoints = [
            {
                lat: course[1].lat,
                lng: course[1].lng,
                icon: "/upload/tmap/marker/pin_b_m_1.png",
            },
            {
                lat: course[2].lat,
                lng: course[1].lng,
                icon: "/upload/tmap/marker/pin_b_m_2.png",
            },
        ];

        waypoints.forEach((waypoint) => {
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(waypoint.lat, waypoint.lng),
                icon: waypoint.icon,
                iconSize: new window.Tmapv2.Size(24, 38),
                map: map,
                draggable: true,
            });
            setResultMarkerArr((prev) => [...prev, marker]);
        });

        document.getElementById("btn_select").addEventListener("click", () => {
            const searchOption = document.getElementById("selectLevel").value;

            const headers = {
                appKey: "biTbgqZv225ydagowr17d9sD74C6uMF55JjTMkOT",
                "Content-Type": "application/json",
            };

            const param = {
                startName: "출발지",
                startX: `${course[0].lat}`,
                startY: `${course[0].lng}`,
                startTime: "201708081103",
                endName: "도착지",
                endX: "127.142571",
                endY: "37.414382",
                viaPoints: [
                    {
                        viaPointId: "test01",
                        viaPointName: "name01",
                        viaX: "127.103790",
                        viaY: "37.399569",
                    },
                    {
                        viaPointId: "test02",
                        viaPointName: "name02",
                        viaX: "127.108913",
                        viaY: "37.402748",
                    },
                    {
                        viaPointId: "test03",
                        viaPointName: "name03",
                        viaX: "127.113403",
                        viaY: "37.397153",
                    },
                    {
                        viaPointId: "test04",
                        viaPointName: "name04",
                        viaX: "127.121210",
                        viaY: "37.410135",
                    },
                    {
                        viaPointId: "test05",
                        viaPointName: "name05",
                        viaX: "127.123296",
                        viaY: "37.399400",
                    },
                    {
                        viaPointId: "test06",
                        viaPointName: "name06",
                        viaX: "127.130933",
                        viaY: "37.406327",
                    },
                    {
                        viaPointId: "test07",
                        viaPointName: "name07",
                        viaX: "127.127337",
                        viaY: "37.413227",
                    },
                ],
                reqCoordType: "WGS84GEO",
                resCoordType: "EPSG3857",
                searchOption: searchOption,
            };

            fetch(
                "https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json",
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(param),
                },
            )
                .then((response) => response.json())
                .then((data) => {
                    const resultData = data.properties;
                    const resultFeatures = data.features;

                    const tDistance =
                        "총 거리 : " +
                        (resultData.totalDistance / 1000).toFixed(1) +
                        "km,  ";
                    const tTime =
                        "총 시간 : " +
                        (resultData.totalTime / 60).toFixed(0) +
                        "분,  ";
                    const tFare = "총 요금 : " + resultData.totalFare + "원";

                    document.getElementById("result").innerText =
                        tDistance + tTime + tFare;

                    if (resultInfoArr.length > 0) {
                        resultInfoArr.forEach((info) => info.setMap(null));
                        setResultInfoArr([]);
                    }

                    resultFeatures.forEach((feature) => {
                        const geometry = feature.geometry;
                        const properties = feature.properties;

                        if (geometry.type === "LineString") {
                            const drawInfoArr = geometry.coordinates.map(
                                (coord) => {
                                    const latlng = new window.Tmapv2.Point(
                                        coord[0],
                                        coord[1],
                                    );
                                    const convertPoint =
                                        new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                            latlng,
                                        );
                                    return new window.Tmapv2.LatLng(
                                        convertPoint._lat,
                                        convertPoint._lng,
                                    );
                                },
                            );

                            const polyline = new window.Tmapv2.Polyline({
                                path: drawInfoArr,
                                strokeColor: "#FF0000",
                                strokeWeight: 6,
                                map: map,
                            });

                            setResultInfoArr((prev) => [...prev, polyline]);
                        } else {
                            let markerImg = "";
                            let size = "";

                            if (properties.pointType === "S") {
                                markerImg = "/upload/tmap/marker/pin_r_m_s.png";
                                size = new window.Tmapv2.Size(24, 38);
                            } else if (properties.pointType === "E") {
                                markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                                size = new window.Tmapv2.Size(24, 38);
                            } else {
                                markerImg =
                                    "http://topopen.tmap.co.kr/imgs/point.png";
                                size = new window.Tmapv2.Size(8, 8);
                            }

                            const latlon = new window.Tmapv2.Point(
                                geometry.coordinates[0],
                                geometry.coordinates[1],
                            );
                            const convertPoint =
                                new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                    latlon,
                                );

                            const marker = new window.Tmapv2.Marker({
                                position: new window.Tmapv2.LatLng(
                                    convertPoint._lat,
                                    convertPoint._lng,
                                ),
                                icon: markerImg,
                                iconSize: size,
                                map: map,
                            });

                            setResultMarkerArr((prev) => [...prev, marker]);
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        });
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
            if (markers.length !== 0) {
                window.Tmapv2.Event.addListener(
                    marker,
                    "dragend",
                    function (evt) {
                        const newPosition = evt.latLng;
                        const updatedPathPoints = [...pathPoints];
                        updatedPathPoints[index] = newPosition;
                        updateMap(map, updatedPathPoints); // 마커 이동 후 경로 업데이트
                    },
                );
            }

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
        if (map === null) {
            initMap();
        }
    }, []);

    useEffect(() => {
        if (map === null) {
            initMap();
        } else {
            updateMap(map, markers);
        }
    }, [course]); // lat, lon이 변경되면 지도를 초기화합니다.

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
