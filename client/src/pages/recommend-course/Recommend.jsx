import React, { useEffect, useState } from "react";

import RoadViewModal from "./RoadViewModal";
import startpin from "../../assets/start_pin.png";
import endpin from "../../assets/end_pin.png";
import waypin from "../../assets/waypoint_yet.png";
import CourseInfo from "./CourseInfo";

const Recommend = ({ location, currentIndex }) => {
    let [map, setMap] = useState(null);
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);
    const [showRoadViewModal, setShowRoadViewModal] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({
        lat: null,
        lng: null,
    });
    const [courseInfo, setCourseInfo] = useState({
        distance: "",
        time: "",
    });
    // originMapRouteAxis 좌표들
    const [courseNode, setCourseNode] = useState([]);
    // convertedRouteAxis 좌표들 폴리라인
    const [courseLine, setCourseLine] = useState([]);

    // 첫점 끝점 뺀 originMapRouteAxis 경유지
    const [filteredCourse, setFilteredCourse] = useState([]);

    useEffect(() => {
        // courseNode 업데이트
        if (location.originMapRouteAxis) {
            setCourseNode(location.originMapRouteAxis);
        }

        // courseLine 업데이트
        if (location.convertedRouteAxis) {
            setCourseLine(location.convertedRouteAxis);
        }

        // filteredCourse 업데이트
        // 첫 번째와 마지막 원소를 제외한 나머지로 구성된 배열을 생성합니다.
        if (
            location.originMapRouteAxis &&
            location.originMapRouteAxis.length > 2
        ) {
            const filtered = location.originMapRouteAxis.slice(1, -1);
            setFilteredCourse(filtered);
        }
    }, [location]); // location이 변경될 때마다 이 useEffect가 실행됩니다.

    // useEffect(() => {
    //     console.log("courseNode", courseNode);
    //     console.log("courseLine", courseLine);
    //     console.log("filteredCourse", filteredCourse);
    // }, [courseNode, courseLine, filteredCourse]);

    const openRoadViewModal = (lat, lng) => {
        setCurrentLocation({ lat, lng });
        setShowRoadViewModal(true);
    };

    const closeRoadViewModal = () => {
        setShowRoadViewModal(false);
    };
    //// 지도 중심점 찾는 함수
    useEffect(() => {
        const center = calculateCenterCoordinate(courseNode);

        if (!map) {
            initTmap(center, courseNode);
        } else {
            updateMap(center, courseNode);
        }

        fetchRoute();
    }, [courseNode]);

    const calculateCenterCoordinate = (courseNode) => {
        let latSum = 0;
        let lngSum = 0;
        const count = courseNode.length;
        for (let i = 0; i < count; i++) {
            latSum += courseNode[i].lat;
            lngSum += courseNode[i].lng;
        }
        return { lat: latSum / count, lng: lngSum / count };
    };
    /////////
    // 지도 업데이트 함수, 중심 좌표를 업데이트하고 마커 다시 그림
    const updateMap = (center, locations) => {
        map.setCenter(new window.Tmapv2.LatLng(center.lat, center.lng));

        // 기존 마커 삭제
        resultMarkerArr.forEach((marker) => marker.setMap(null));
        setResultMarkerArr([]);

        // 기존 라인 삭제
        resultInfoArr.forEach((line) => line.setMap(null));
        setResultInfoArr([]);

        // 시작점 마커 생성
        const startMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                courseNode[0].lat,
                courseNode[0].lng,
            ),
            icon: startpin, // 시작점 아이콘
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, startMarker]);
        startMarker.addListener("touchstart", () => {
            openRoadViewModal(courseNode[0].lat, courseNode[0].lng);
            console.log(`lat: ${courseNode[0].lat}, lng: ${courseNode[0].lng}`);
        });

        // 끝점 마커 생성
        const endMarkerIndex = courseNode.length - 1;
        // 예시: 끝점 마커 생성 부분 수정
        const endMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                courseNode[endMarkerIndex].lat,
                courseNode[endMarkerIndex].lng,
            ),
            icon: endpin, // 끝점 아이콘으로 수정
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });

        endMarker.addListener("touchstart", () => {
            openRoadViewModal(
                courseNode[endMarkerIndex].lat,
                courseNode[endMarkerIndex].lng,
            );
            console.log(
                `lat: ${courseNode[endMarkerIndex].lat}, lng: ${courseNode[endMarkerIndex].lng}`,
            );
        });

        setResultMarkerArr((prev) => [...prev, endMarker]);

        // 경유지 마커 생성
        for (let i = 0; i < filteredCourse.length; i++) {
            const waypointMarker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(
                    filteredCourse[i].lat,
                    filteredCourse[i].lng,
                ),
                icon: waypin, // 경유지 아이콘
                iconSize: new window.Tmapv2.Size(24, 24),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, waypointMarker]);
            waypointMarker.addListener("touchstart", () => {
                openRoadViewModal(filteredCourse[i].lat, filteredCourse[i].lng);
                console.log(
                    `lat: ${filteredCourse[i].lat}, lng: ${filteredCourse[i].lng}`,
                );
            });
        }
    };

    const initTmap = (center, courseNode) => {
        setResultMarkerArr([]);

        map = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(center.lat, center.lng),
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
                courseNode[0].lat,
                courseNode[0].lng,
            ),
            icon: startpin,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, startMarker]);
        startMarker.addListener("touchstart", () => {
            openRoadViewModal(courseNode[0].lat, courseNode[0].lng);
            console.log(`lat: ${courseNode[0].lat}, lng: ${courseNode[0].lng}`);
        });
        // 끝점 마커 생성
        const endMarkerIndex = courseNode.length - 1;
        const endMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                courseNode[endMarkerIndex].lat,
                courseNode[endMarkerIndex].lng,
            ),
            icon: endpin,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, endMarker]);

        endMarker.addListener("touchstart", () => {
            openRoadViewModal(
                courseNode[endMarkerIndex].lat,
                courseNode[endMarkerIndex].lng,
            );
            console.log(
                `lat: ${courseNode[endMarkerIndex].lat}, lng: ${courseNode[endMarkerIndex].lng}`,
            );
        });

        for (let i = 0; i < courseNode.length; i++) {
            const waypointMarker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(
                    filteredCourse[i].lat,
                    filteredCourse[i].lng,
                ),
                icon: waypin,
                iconSize: new window.Tmapv2.Size(24, 24),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, waypointMarker]);

            waypointMarker.addListener("touchstart", () => {
                openRoadViewModal(filteredCourse[i].lat, filteredCourse[i].lng);
                console.log(
                    `lat: ${filteredCourse[i].lat}, lng: ${filteredCourse[i].lng}`,
                );
            });
        }
    };

    const headers = {
        appKey: "9HZ42peAS298sFouPX3oN5yCj2KQUJEa9a3SLlSM",
        "Content-Type": "application/json",
    };

    const fetchRoute = () => {
        const startLat = courseLine[0].lat;
        const startLng = courseLine[0].lng;
        const endLat = courseLine[courseInfo.length - 1].lat;
        const endLng = courseLine[courseInfo.length - 1].lng;

        // 경유지 정보 생성
        const viaPoints = courseLine.slice(1, -1).map((point, index) => ({
            viaPointId: `via${index}`,
            viaPointName: `Via ${index + 1}`,
            viaX: point.lng.toString(), // 경도(lng) 값 사용
            viaY: point.lat.toString(), // 위도(lat) 값 사용
        }));

        const param = {
            startName: "출발지",
            startX: startLng.toString(),
            startY: startLat.toString(),
            startTime: "201708081103",
            endName: "도착지",
            endX: endLng.toString(),
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
            <CourseInfo
                courseInfo={courseInfo}
                currentIndex={currentIndex}
                courseNode={courseNode}
            ></CourseInfo>

            <div
                id="map_wrap"
                className="map_wrap"
                style={{ height: "calc(100vh - 100px)", zIndex: 1 }}
            >
                <div id="map_div" style={{ height: "100%" }}></div>
            </div>

            <div>
                {showRoadViewModal && (
                    <RoadViewModal
                        open={showRoadViewModal}
                        closeModal={closeRoadViewModal}
                        lat={currentLocation.lat}
                        lng={currentLocation.lng}
                    />
                )}
            </div>
        </div>
    );
};

export default Recommend;
