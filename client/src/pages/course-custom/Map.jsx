import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import startPin from "../../assets/map_marker_start.png";
import endPin from "../../assets/map_marker_end.png";
import waypointPin from "../../assets/waypoint_yet.png";

function Map({ course, lat, lng }) {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    // polyline을 그리기 위한 path(꼭지점) 좌표를 저장하는 리스트
    const [courseLine, setCourseLine] = useState([]);

    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);

    // viaPoint 설정을 위한 filteredCourse
    const [filteredCourse, setFilteredCourse] = useState([]);

    // 실행취소 기능 구현을 위한 상태와 함수
    const [isPolylineEditing, setIsPolylineEditing] = useState(false);
    const [polyline, setPolyline] = useState(null);
    const handleUndo = () => {
        if (isPolylineEditing) {
            polyline.endEdit(); // 드래그 상태 종료
            setIsPolylineEditing(false); // 드래그 상태를 false로 업데이트
        }
    };

    const startPoint = course[0];
    const endPoint = course[course.length - 1];
    useEffect(() => {
        if (course.length > 1) {
            setFilteredCourse(course.slice(1, course.length - 1));
        }
    }, [course]);

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
            height: "100vh",
            zoom: 16,
        });

        setMap(newMap);
    };

    const postRouteSequential30 = async () => {
        const searchOption = "2";

        const headers = {
            appKey: import.meta.env.VITE_TMAP_API_KEY,
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
            viaPoints: filteredCourse.map((point) => ({
                viaPointId: `test${filteredCourse.indexOf(point) + 1}`,
                viaPointName: `name${filteredCourse.indexOf(point) + 1}`,
                viaX: `${point.lng}`,
                viaY: `${point.lat}`,
            })),
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
                // console.log("호출 완료!");
                // console.log(data);
                // 총 거리, 시간, 요금이 담겨있는 데이터
                const resultData = data.properties;

                // 경유지 위치 정보들이 담겨 있는 배열
                const resultFeatures = data.features;
                // console.log(resultFeatures);

                const tDistance =
                    "총 거리 : " +
                    (resultData.totalDistance / 1000).toFixed(1) +
                    "km,  ";
                const tTime =
                    "총 시간 : " +
                    (resultData.totalTime / 60).toFixed(0) +
                    "분,  ";
                const tFare = "총 요금 : " + resultData.totalFare + "원";

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
                                console.log(filteredCourse);
                                console.log(convertPoint);
                                if (
                                    filteredCourse.some(
                                        (point) =>
                                            point.lat === convertPoint._lat &&
                                            point.lng === convertPoint._lng,
                                    )
                                ) {
                                    // filteredCourse 리스트에 포함되어 있으면 courseLine 상태 업데이트
                                    setCourseLine((prev) => [
                                        ...prev,
                                        convertPoint,
                                    ]);
                                }
                                // setCourseLine((prev) => [
                                //     ...prev,
                                //     convertPoint,
                                // ]);

                                return new window.Tmapv2.LatLng(
                                    convertPoint._lat,
                                    convertPoint._lng,
                                );
                            },
                        );

                        // setResultInfoArr((prev) => [...prev, polyline]);
                    }
                    if (geometry.type !== "LineString") {
                        // type이 Point(노드)일 경우
                        let markerImg = "";
                        let size = "";
                        let draggable = false;

                        if (properties.pointType === "S") {
                            // 시작점이면
                            markerImg = startPin;
                            size = new window.Tmapv2.Size(24, 38);
                        } else if (properties.pointType === "E") {
                            // 종착점이면
                            markerImg = endPin;
                            size = new window.Tmapv2.Size(24, 38);
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

    useEffect(() => {
        if (map === null) {
            initMap();
        }
    }, []);

    useEffect(() => {
        if (map !== null) {
            postRouteSequential30();
            // console.log(courseLine);
        }
    }, [map]);

    useEffect(() => {
        console.log(courseLine); // courseLine이 변경될 때 로그를 출력
        if (courseLine.length > 0) {
            const newPolyline = new window.Tmapv2.Polyline({
                path: courseLine,
                strokeColor: "#6386BE",
                strokeWeight: 8,
                strokeOpacity: 100,
                map: map,
                draggable: true, //드래그 여부
                direction: true,
                directionColor: "white",
            });

            newPolyline.addListener(
                "click",
                function () {
                    if (this.isEditing()) {
                        this.endEdit();
                        setIsPolylineEditing(false);
                    } else {
                        this.startEdit();
                        setIsPolylineEditing(true);
                    }
                },
                newPolyline,
            );
        }
    }, [courseLine]);

    return (
        <>
            <Box>
                <Button onClick={handleUndo}>실행 취소</Button>
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
