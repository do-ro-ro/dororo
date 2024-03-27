import React, { useEffect, useState } from "react";

import RoadViewModal from "./RoadViewModal";
import startpin from "../../assets/start_pin.png";
import endpin from "../../assets/end_pin.png";
import waypin from "../../assets/waypoint_yet.png";
import CourseInfo from "./CourseInfo";

const Recommend = ({ locations, currentIndex }) => {
    let [map, setMap] = useState(null);
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);
    const [showRoadViewModal, setShowRoadViewModal] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({
        lat: null,
        lon: null,
    });
    const [courseInfo, setCourseInfo] = useState({
        distance: "",
        time: "",
    });

    const openRoadViewModal = (lat, lon) => {
        setCurrentLocation({ lat, lon });
        setShowRoadViewModal(true);
    };

    const closeRoadViewModal = () => {
        setShowRoadViewModal(false);
    };

    useEffect(() => {
        const center = calculateCenterCoordinate(locations);

        if (!map) {
            initTmap(center, locations);
        } else {
            updateMap(center, locations);
        }

        fetchRoute();
    }, [locations]);

    const calculateCenterCoordinate = (locations) => {
        let latSum = 0;
        let lonSum = 0;
        const count = locations.lat.length;
        for (let i = 0; i < count; i++) {
            latSum += locations.lat[i];
            lonSum += locations.lon[i];
        }
        return { lat: latSum / count, lon: lonSum / count };
    };

    // 지도 업데이트 함수: 중심 좌표를 업데이트하고 마커를 다시 그립니다.
    const updateMap = (center, locations) => {
        map.setCenter(new window.Tmapv2.LatLng(center.lat, center.lon));

        // 기존 마커 삭제
        resultMarkerArr.forEach((marker) => marker.setMap(null));
        setResultMarkerArr([]);

        // 기존 라인 삭제
        resultInfoArr.forEach((line) => line.setMap(null));
        setResultInfoArr([]);

        // 시작점 마커 생성
        const startMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                locations.lat[0],
                locations.lon[0],
            ),
            icon: startpin, // 시작점 아이콘
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, startMarker]);
        startMarker.addListener("touchstart", () => {
            openRoadViewModal(locations.lat[0], locations.lon[0]);
            console.log(`lat: ${locations.lat[0]}, lon: ${locations.lon[0]}`);
        });

        // 끝점 마커 생성
        const endMarkerIndex = locations.lat.length - 1;
        // 예시: 끝점 마커 생성 부분 수정
        const endMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                locations.lat[endMarkerIndex],
                locations.lon[endMarkerIndex],
            ),
            icon: endpin, // 끝점 아이콘으로 수정
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });

        endMarker.addListener("touchstart", () => {
            openRoadViewModal(
                locations.lat[endMarkerIndex],
                locations.lon[endMarkerIndex],
            );
            console.log(
                `lat: ${locations.lat[endMarkerIndex]}, lon: ${locations.lon[endMarkerIndex]}`,
            );
        });

        setResultMarkerArr((prev) => [...prev, endMarker]);

        // 경유지 마커 생성 (첫 번째와 마지막 좌표 제외)
        for (let i = 1; i < locations.lat.length - 1; i++) {
            const waypointMarker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(
                    locations.lat[i],
                    locations.lon[i],
                ),
                icon: waypin, // 경유지 아이콘
                iconSize: new window.Tmapv2.Size(24, 24),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, waypointMarker]);
            waypointMarker.addListener("touchstart", () => {
                openRoadViewModal(locations.lat[i], locations.lon[i]);
                console.log(
                    `lat: ${locations.lat[i]}, lon: ${locations.lon[i]}`,
                );
            });
        }
    };

    const initTmap = (center, locations) => {
        setResultMarkerArr([]);

        map = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(center.lat, center.lon),
            width: "100%",
            height: "100vh",
            zoom: 15,
            zoomControl: true,
            scrollwheel: true,
        });

        setMap(map);

        // 시작점 마커 생성
        const startMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                locations.lat[0],
                locations.lon[0],
            ),
            icon: startpin,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, startMarker]);
        startMarker.addListener("touchstart", () => {
            openRoadViewModal(locations.lat[0], locations.lon[0]);
            console.log(`lat: ${locations.lat[0]}, lon: ${locations.lon[0]}`);
        });
        // 끝점 마커 생성
        const endMarkerIndex = locations.lat.length - 1;
        const endMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                locations.lat[endMarkerIndex],
                locations.lon[endMarkerIndex],
            ),
            icon: endpin,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, endMarker]);

        endMarker.addListener("touchstart", () => {
            openRoadViewModal(
                locations.lat[endMarkerIndex],
                locations.lon[endMarkerIndex],
            );
            console.log(
                `lat: ${locations.lat[endMarkerIndex]}, lon: ${locations.lon[endMarkerIndex]}`,
            );
        });

        for (let i = 1; i < locations.lat.length - 1; i++) {
            const waypointMarker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(
                    locations.lat[i],
                    locations.lon[i],
                ),
                icon: waypin,
                iconSize: new window.Tmapv2.Size(24, 24),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, waypointMarker]);

            waypointMarker.addListener("touchstart", () => {
                openRoadViewModal(locations.lat[i], locations.lon[i]);
                console.log(
                    `lat: ${locations.lat[i]}, lon: ${locations.lon[i]}`,
                );
            });
        }
    };

    const headers = {
        appKey: "9HZ42peAS298sFouPX3oN5yCj2KQUJEa9a3SLlSM",
        "Content-Type": "application/json",
    };

    const fetchRoute = () => {
        const startLat = locations.lat[0];
        const startLon = locations.lon[0];
        const endLat = locations.lat[locations.lat.length - 1];
        const endLon = locations.lon[locations.lon.length - 1];

        // 경유지 정보 생성
        const viaPoints = locations.lat.slice(1, -1).map((lat, index) => ({
            viaPointId: `via${index}`,
            viaPointName: `Via ${index + 1}`,
            viaX: locations.lon[index + 1].toString(),
            viaY: lat.toString(),
        }));

        const param = {
            startName: "출발지",
            startX: startLon.toString(),
            startY: startLat.toString(),
            startTime: "201708081103",
            endName: "도착지",
            endX: endLon.toString(),
            endY: endLat.toString(),
            viaPoints: viaPoints,
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            searchOption: 0,
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

                const tDistance = (resultData.totalDistance / 1000).toFixed(1);

                const tTime = (resultData.totalTime / 60).toFixed(0);
                setCourseInfo({
                    distance: `${tDistance}km`,
                    time: `${tTime}분`,
                });

                // if (resultInfoArr.length > 0) {
                //     resultInfoArr.forEach((info) => info.setMap(null));
                //     setResultInfoArr([]);
                // }

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
    };

    return (
        <div>
            {/* CourseInfo redux 사용해서 전역으로 빼야함  그리고 CourseInfo RecommendCoursePage에 놔둬야 에러 해결 가능 */}
            <CourseInfo
                courseInfo={courseInfo}
                currentIndex={currentIndex}
            ></CourseInfo>

            <div id="map_wrap" className="map_wrap">
                <div id="map_div"></div>
            </div>

            <div>
                {showRoadViewModal && (
                    <RoadViewModal
                        open={showRoadViewModal}
                        closeModal={closeRoadViewModal}
                        lat={currentLocation.lat}
                        lon={currentLocation.lon}
                    />
                )}
            </div>
        </div>
    );
};

export default Recommend;
