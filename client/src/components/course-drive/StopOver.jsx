import React, { useEffect, useState } from "react";
import me_pointer from "../../assets/me_pointer.png";
import start_pointer from "../../assets/map_marker_start.png";
import end_pointer from "../../assets/map_marker_end.png";
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
import waypoint_passed from "../../assets/waypoint_passed.png";

const StopOver = ({
    lat,
    lng,
    courseNode,
    setCourseNode,
    courseLine,
    setCourseLine,
    filteredCourse,
    setFilteredCourse,
    filteredNode,
    setFilteredNode,
    // visited,
    setTime,
    setKm,
}) => {
    const [visited, setVisited] = useState([]);
    // const visited = Array(filteredCourse.length).fill(false);
    let [map, setMap] = useState(null);
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);
    const [currentLocationMarker, setCurrentLocationMarker] = useState(null); // 추가: 현재 위치 마커
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

    useEffect(() => {
        // visited 배열이 모두 true 인지 확인
        const allVisited = visited.every((visit) => visit);

        // visited 배열이 모두 true일 때 발생하는 이벤트 처리

        if (allVisited && visited.length >= 2) {
            let targetLat = lat; // 타겟 경도
            let targetLng = lng; // 타겟 위도

            let latPlus = courseLine[courseLine.length - 1].lat + 0.0003;
            let latMinus = courseLine[courseLine.length - 1].lat - 0.0003;
            let lngPlus = courseLine[courseLine.length - 1].lng + 0.0004;
            let lngMinus = courseLine[courseLine.length - 1].lng - 0.0004;

            if (targetLat >= latMinus && targetLat <= latPlus) {
                if (targetLng >= lngMinus && targetLng <= lngPlus) {
                    // 여기에 이벤트 처리 코드 추가
                    console.log(visited);
                    alert("동작 잘 됨");
                    // 예를 들어, 어떤 동작을 수행하거나 알림을 띄울 수 있습니다.
                }
            }
        }
    }, [visited, lat, lng]);

    useEffect(() => {
        if (filteredCourse.length >= 2) {
            setVisited(Array(filteredCourse.length).fill(false));
        }
    }, [filteredCourse]);

    useEffect(() => {
        const waypoints = filteredNode.map((point, index) => ({
            lat: point.lat,
            lng: point.lng,
            icon: visited[index] ? waypoint_passed : points[index],
        }));

        waypoints.forEach((waypoint) => {
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(waypoint.lat, waypoint.lng),
                icon: waypoint.icon,
                iconSize: new window.Tmapv2.Size(24, 24),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, marker]);
        });
    }, [visited]);
    useEffect(() => {
        if (visited.length >= 2) {
            for (let i = 0; i < visited.length; i++) {
                let latPlus = filteredCourse[i].lat + 0.0003;
                let latMinus = filteredCourse[i].lat - 0.0003;
                let lngPlus = filteredCourse[i].lng + 0.0004;
                let lngMinus = filteredCourse[i].lng - 0.0004;

                let targetLat = lat; // 타겟 경도
                let targetLng = lng; // 타겟 위도
                if (targetLat >= latMinus && targetLat <= latPlus) {
                    if (targetLng >= lngMinus && targetLng <= lngPlus) {
                        // console.log(visited);
                        setVisited((prevVisited) => {
                            const newVisited = [...prevVisited];
                            newVisited[i] = true;
                            return newVisited;
                        });
                    }
                }
            }
        }
    }, [lat, lng, filteredCourse]);

    useEffect(() => {
        if (courseLine.length > 2 && visited.length >= 2) {
            initTmap();
        }
    }, [filteredCourse, visited]);

    useEffect(() => {
        if (courseLine.length > 1) {
            setFilteredCourse(courseLine.slice(1, courseLine.length - 1));
            setFilteredNode(courseNode.slice(1, courseNode.length - 1));
            // setFillterList(coolList.slice(1, coolList.length - 1));
            // setCourseNode(courseNode.slice(1, courseNode.length - 1));
        }
    }, [courseLine]);

    useEffect(() => {
        if (map && lat && lng) {
            // Move map center to current marker position
            map.setCenter(new window.Tmapv2.LatLng(lat, lng));
        }
    }, [map, lat, lng]);

    useEffect(() => {
        // 추가: 현재 위치 마커 설정
        if (map && lat && lng) {
            // 기존의 현재 위치 마커가 존재하면 제거
            if (currentLocationMarker) {
                currentLocationMarker.setMap(null);
            }
            // 새로운 현재 위치 마커 생성 및 설정
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(lat, lng),
                icon: me_pointer, // 사용할 아이콘의 URL로 교체
                iconSize: new window.Tmapv2.Size(24, 24), // 아이콘 크기 조정
                map: map,
            });
            setCurrentLocationMarker(marker);
            setResultMarkerArr((prev) => [...prev, marker]);
        }
    }, [map, lat, lng]);

    const initTmap = () => {
        if (map !== null) {
            return;
        }
        setResultMarkerArr([]);

        map = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(lat, lng),
            width: "100%",
            height: "100vh",
            zoom: 16,
            zoomControl: true,
            scrollwheel: true,
        });

        setMap(map);
        // 출발지
        const marker_s = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                courseLine[0].lat,
                courseLine[0].lng,
            ),
            icon: start_pointer,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_s]);

        const marker_e = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
                courseLine[courseLine.length - 1].lat,
                courseLine[courseLine.length - 1].lng,
            ),
            icon: end_pointer,
            iconSize: new window.Tmapv2.Size(24, 38),
            map: map,
        });
        setResultMarkerArr((prev) => [...prev, marker_e]);

        const waypoints = filteredNode.map((point, index) => ({
            lat: point.lat,
            lng: point.lng,
            icon: visited[index] ? waypoint_passed : points[index],
        }));

        waypoints.forEach((waypoint) => {
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(waypoint.lat, waypoint.lng),
                icon: waypoint.icon,
                iconSize: new window.Tmapv2.Size(24, 24),
                map: map,
            });
            setResultMarkerArr((prev) => [...prev, marker]);
        });

        // document
        //     .getElementById("btn_select")
        //     .addEventListener("click", () => {});
        const headers = {
            appKey: import.meta.env.VITE_TMAP_API_KEY,
            "Content-Type": "application/json",
        };

        const param = {
            startName: "출발지",
            startX: courseLine[0].lng.toString(),
            startY: courseLine[0].lat.toString(),
            startTime: "201708081103",
            endName: "도착지",
            endX: courseLine[courseLine.length - 1].lng.toString(),
            endY: courseLine[courseLine.length - 1].lat.toString(),
            viaPoints: filteredCourse.map((point) => ({
                viaPointId: `test${filteredCourse.indexOf(point) + 1}`,
                viaPointName: `name${filteredCourse.indexOf(point) + 1}`,
                viaX: point.lng.toString(),
                viaY: point.lat.toString(),
            })),
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            searchOption: 1,
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

                setTime(tTime);
                setKm(tDistance);

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
                            size = new window.Tmapv2.Size(24, 24);
                        } else if (properties.pointType === "E") {
                            markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                            size = new window.Tmapv2.Size(24, 24);
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
            <p id="result"></p>
            {/* <button id="btn_select">적용하기</button> */}
            <div id="map_wrap" className="map_wrap">
                <div id="map_div"></div>
            </div>
        </div>
    );
};

export default StopOver;
