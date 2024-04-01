import React, { useEffect, useState } from "react";

import RoadViewModal from "./RoadViewModal";

import start_pointer from "../../assets/map_marker_start.png";
import end_pointer from "../../assets/map_marker_end.png";
import waypin from "../../assets/waypoint_yet.png";
import CourseInfo from "./CourseInfo";
import waypoint_1 from "../../assets/waypoints_number/waypoint_1.png";
import waypoint_2 from "../../assets/waypoints_number/waypoint_2.png";
import waypoint_3 from "../../assets/waypoints_number/waypoint_3.png";
import waypoint_4 from "../../assets/waypoints_number/waypoint_4.png";
import waypoint_5 from "../../assets/waypoints_number/waypoint_5.png";
import waypoint_6 from "../../assets/waypoints_number/waypoint_6.png";
import waypoint_7 from "../../assets/waypoints_number/waypoint_7.png";
import waypoint_8 from "../../assets/waypoints_number/waypoint_8.png";
import waypoint_9 from "../../assets/waypoints_number/waypoint_9.png";
import waypoint_10 from "../../assets/waypoints_number/waypoint_10.png";
import waypoint_11 from "../../assets/waypoints_number/waypoint_11.png";
import waypoint_12 from "../../assets/waypoints_number/waypoint_12.png";
import waypoint_13 from "../../assets/waypoints_number/waypoint_13.png";
import waypoint_14 from "../../assets/waypoints_number/waypoint_14.png";
import waypoint_15 from "../../assets/waypoints_number/waypoint_15.png";
import waypoint_16 from "../../assets/waypoints_number/waypoint_16.png";
import waypoint_17 from "../../assets/waypoints_number/waypoint_17.png";
import waypoint_18 from "../../assets/waypoints_number/waypoint_18.png";
import waypoint_19 from "../../assets/waypoints_number/waypoint_19.png";
import waypoint_20 from "../../assets/waypoints_number/waypoint_20.png";
import waypoint_21 from "../../assets/waypoints_number/waypoint_21.png";
import waypoint_22 from "../../assets/waypoints_number/waypoint_22.png";
import waypoint_23 from "../../assets/waypoints_number/waypoint_23.png";
import waypoint_24 from "../../assets/waypoints_number/waypoint_24.png";
import waypoint_25 from "../../assets/waypoints_number/waypoint_25.png";
import waypoint_26 from "../../assets/waypoints_number/waypoint_26.png";
import waypoint_27 from "../../assets/waypoints_number/waypoint_27.png";
import waypoint_28 from "../../assets/waypoints_number/waypoint_28.png";
import waypoint_29 from "../../assets/waypoints_number/waypoint_29.png";
import waypoint_30 from "../../assets/waypoints_number/waypoint_30.png";

const Recommend = ({
    courseNode,
    currentIndex,
    courseLine,
    filteredCourse,
}) => {
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

    const points = [
        waypoint_1,
        waypoint_2,
        waypoint_3,
        waypoint_4,
        waypoint_5,
        waypoint_6,
        waypoint_7,
        waypoint_8,
        waypoint_9,
        waypoint_10,
        waypoint_11,
        waypoint_12,
        waypoint_13,
        waypoint_14,
        waypoint_15,
        waypoint_16,
        waypoint_17,
        waypoint_18,
        waypoint_19,
        waypoint_20,
        waypoint_21,
        waypoint_22,
        waypoint_23,
        waypoint_24,
        waypoint_25,
        waypoint_26,
        waypoint_27,
        waypoint_28,
        waypoint_29,
        waypoint_30,
    ];

    // useEffect(() => {
    //     console.log("1", courseNode);
    //     console.log("2", courseLine);
    //     console.log("3", filteredCourse);
    // }, [courseNode, courseLine, filteredCourse]);

    const openRoadViewModal = (lat, lng) => {
        setCurrentLocation({ lat, lng });
        setShowRoadViewModal(true);
    };

    const closeRoadViewModal = () => {
        setShowRoadViewModal(false);
    };

    useEffect(() => {
        const center = calculateCenterCoordinate(courseNode);

        if (courseNode.length >= 1) {
            if (map === null) {
                // console.log("dd");
                // console.log(courseNode);
                initTmap(center, courseNode);
            } else {
                updateMap(center, courseNode);
            }
            fetchRoute();
        }
    }, [courseNode, filteredCourse, courseLine, map]); // map도 의존성 배열에 추가하여 map 상태 변경에도 반응하도록 함

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
    const updateMap = (center, courseNode) => {
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
            icon: start_pointer, // 시작점 아이콘
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
            icon: end_pointer, // 끝점 아이콘으로 수정
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
                icon: points[i], // 경유지 아이콘
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
            icon: start_pointer,
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
            icon: end_pointer,
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

        for (let i = 0; i < filteredCourse.length; i++) {
            const waypointMarker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(
                    filteredCourse[i].lat,
                    filteredCourse[i].lng,
                ),
                icon: points[i],
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
        appKey: import.meta.env.VITE_TMAP_API_KEY,
        "Content-Type": "application/json",
    };

    const fetchRoute = () => {
        const startLat = courseLine[0].lat;
        const startLng = courseLine[0].lng;
        const endLat = courseLine[courseLine.length - 1].lat;
        const endLng = courseLine[courseLine.length - 1].lng;

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

                if (resultInfoArr.length > 0) {
                    resultInfoArr.forEach((info) => {
                        // 객체가 _isDummy 속성을 가지고 있지 않고, setMap 메소드를 가지고 있는지 확인
                        if (
                            !info._isDummy &&
                            typeof info.setMap === "function"
                        ) {
                            info.setMap(null);
                        }
                    });
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
                            strokeColor: "#6386BE",
                            strokeWeight: 8,
                            strokeOpacity: 100,
                            direction: true,
                            directionColor: "white",
                            map: map,
                        });

                        setResultInfoArr((prev) => [...prev, polyline]);
                    } else {
                        let markerImg = "";
                        let size = "";

                        if (properties.pointType === "S") {
                            markerImg = "/upload/tmap/marker/pin_r_m_s.png";
                            size = new window.Tmapv2.Size(0, 0);
                        } else if (properties.pointType === "E") {
                            markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                            size = new window.Tmapv2.Size(0, 0);
                        } else {
                            markerImg =
                                "http://topopen.tmap.co.kr/imgs/point.png";
                            size = new window.Tmapv2.Size(0, 0);
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
