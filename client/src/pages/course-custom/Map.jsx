import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import startPin from "../../assets/map_marker_start.png";
import endPin from "../../assets/map_marker_end.png";
import waypointPin from "../../assets/waypoint_yet.png";

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
            zoom: 15,
        });

        setMap(newMap);

        // 출발점 마커 설정
        const marker_s = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(startPoint.lat, startPoint.lng),
            icon: startPin,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: newMap,
        });
        setResultMarkerArr((prev) => [...prev, marker_s]);

        //종착점 마커 설정
        const marker_e = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(endPoint.lat, endPoint.lng),
            icon: endPin,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: newMap,
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

        // 각 웨이포인트에 마커 찍어주기
        // waypoints.forEach((waypoint) => {
        //     const marker = new window.Tmapv2.Marker({
        //         position: new window.Tmapv2.LatLng(waypoint.lat, waypoint.lng),
        //         icon: waypointPin,
        //         iconSize: new window.Tmapv2.Size(24, 24),
        //         map: newMap,
        //         draggable: true,
        //     });
        //     setResultMarkerArr((prev) => [...prev, marker]);
        // });

        //
        const postRouteSequential30 = async () => {
            const searchOption = "2";

            const headers = {
                appKey: "biTbgqZv225ydagowr17d9sD74C6uMF55JjTMkOT",
                "Content-Type": "application/json",
            };

            const param = {
                startName: "출발지",
                startX: `${startPoint.lng}`,
                startY: `${startPoint.lat}`,
                // startX: "128.855674",
                // startY: "35.093555",
                startTime: "202403201103",
                endName: "도착지",
                endX: `${endPoint.lng}`,
                endY: `${endPoint.lat}`,
                // endX: "128.862074",
                // endY: "35.089101",
                viaPoints: [
                    {
                        viaPointId: "test01",
                        viaPointName: "name01",
                        viaX: "128.859205",
                        viaY: "35.093515",
                    },
                    {
                        viaPointId: "test02",
                        viaPointName: "name02",
                        viaX: "128.859254",
                        viaY: "35.08902",
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
                    console.log("호출 완료!");
                    // console.log(data);
                    // 총 거리, 시간, 요금이 담겨있는 데이터
                    const resultData = data.properties;

                    // 경유지 위치 정보들이 담겨 있는 배열
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

                    // document.getElementById("result").innerText =
                    //     tDistance + tTime + tFare;

                    // resultInfoArr에 값이 존재하면, 갱신할 것
                    if (resultInfoArr.length > 0) {
                        resultInfoArr.forEach((info) => info.setMap(null));
                        setResultInfoArr([]);
                    }

                    // resultFeatures 의 정보 추출하기 위한 forEach문
                    resultFeatures.forEach((feature) => {
                        const geometry = feature.geometry;
                        const properties = feature.properties;
                        // console.log(geometry);

                        // 해당 정보 타입이 LineString(링크) 일 경우
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
                                    // console.log(convertPoint);
                                    return new window.Tmapv2.LatLng(
                                        convertPoint._lat,
                                        convertPoint._lng,
                                    );
                                },
                            );

                            const polyline = new window.Tmapv2.Polyline({
                                path: drawInfoArr,
                                strokeColor: "#6386BE",
                                strokeWeight: 15,
                                map: newMap,
                            });
                            console.log(polyline);

                            setResultInfoArr((prev) => [...prev, polyline]);
                        } else {
                            // type이 Point(노드)일 경우
                            let markerImg = "";
                            let size = "";
                            let draggable = false;

                            if (properties.pointType === "S") {
                                // 시작점이면
                                markerImg = startPin;
                                size = new window.Tmapv2.Size(48, 76);
                            } else if (properties.pointType === "E") {
                                // 종착점이면
                                markerImg = endPin;
                                size = new window.Tmapv2.Size(48, 76);
                            } else {
                                // 거쳐가는 점이면
                                markerImg = waypointPin;
                                size = new window.Tmapv2.Size(24, 24);
                                draggable = true;
                            }

                            const latlng = new window.Tmapv2.Point(
                                geometry.coordinates[0],
                                geometry.coordinates[1],
                            );
                            const convertPoint =
                                new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                    latlng,
                                );

                            const marker = new window.Tmapv2.Marker({
                                position: new window.Tmapv2.LatLng(
                                    convertPoint._lat,
                                    convertPoint._lng,
                                ),
                                icon: markerImg,
                                iconSize: size,
                                draggable: draggable,
                                map: newMap,
                            });

                            setResultMarkerArr((prev) => [...prev, marker]);
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };
        postRouteSequential30();
    };

    useEffect(() => {
        if (map === null) {
            initMap();
        }
    }, [map]);

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
