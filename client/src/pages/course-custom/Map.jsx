import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import startPin from "../../assets/map_marker_start.png";
import endPin from "../../assets/map_marker_end.png";
import waypointPin from "../../assets/waypoint_yet.png";
import waypointPinSelected from "../../assets/waypoint_passed.png";
import { useLocation } from "react-router-dom";

// 커스텀 대안

// drawer 등 각 Marker에 대한 바로가기 버튼 생성 or 직접 선택 가능
// waypoint 마커를 클릭하면, draggable 활성화.
// drag가 끝날 때, eventListener를 통해 마커의 getPosition 실행
// 해당 인덱스의 마커 좌표값 변경, 경유지 코스 API 조회 호출 (Polyline 갱신)
// 저장 or 나가기 버튼을 통해 코스 형태 결정
// 저장을 누르면 코스 이름 입력, 저장. (기존 추천 코스 저장 로직과 동일)
// 나가기를 누르면 navigate(-1)이 아니라, 그냥 해당 mapId 정보로 redirect

function Map({ course }) {
    const location = useLocation();
    const currentCourse = location.state;

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const [selectedMarker, setSelectedMarker] = useState(null);

    // polyline을 그리기 위한 보정된 path(꼭지점) 좌표를 저장하는 리스트
    const [courseLine, setCourseLine] = useState([]);

    // viaPoint 설정을 위해 첫점과 끝점을 제외한 path 좌표를 저장하는 리스트
    const [filteredCourse, setFilteredCourse] = useState([]);

    // 지도 위 거점을 찍기 위한 오리지널 노드 좌표를 저장하는 리스트
    const [courseNode, setCourseNode] = useState([]);

    // 경유지 찾기 API를 통해 그린 마커가 들어있는 배열
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);

    // 실행취소 기능 구현을 위한 상태와 함수
    const [isPolylineEditing, setIsPolylineEditing] = useState(false);
    const [polyline, setPolyline] = useState(null);

    const handleUndo = () => {
        if (isPolylineEditing) {
            polyline.endEdit(); // 드래그 상태 종료
            setIsPolylineEditing(false); // 드래그 상태를 false로 업데이트
        }
    };

    const startPoint = currentCourse?.originMapRouteAxis[0];
    const endPoint =
        currentCourse?.originMapRouteAxis[
            currentCourse.originMapRouteAxis.length - 1
        ];

    // 코스정보를 받아왔을 때 웨이포인트는 보정 전 좌표로 등록하기
    useEffect(() => {
        if (course.length > 1) {
            setFilteredCourse(
                currentCourse.originMapRouteAxis.slice(
                    1,
                    currentCourse.originMapRouteAxis.length - 1,
                ),
            );
        }
    }, [currentCourse]);

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
            startTime: "202403201103",
            endName: "도착지",
            endX: `${endPoint.lng}`,
            endY: `${endPoint.lat}`,
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
                console.log("호출 완료!");
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

                                setCourseLine((prev) => [
                                    ...prev,
                                    convertPoint,
                                ]);

                                return new window.Tmapv2.LatLng(
                                    convertPoint._lat,
                                    convertPoint._lng,
                                );
                            },
                        );
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

                        setResultMarkerArr((prev) => [...prev, convertPoint]);
                    }
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        console.log(currentCourse);
        if (map === null) {
            initMap();
        }
    }, []);

    useEffect(() => {
        if (map !== null) {
            setCourseLine([]);
            setResultMarkerArr([]);
            postRouteSequential30();
            // console.log(courseLine);
        }
    }, [map]);

    useEffect(() => {
        // console.log(courseLine); // courseLine이 변경될 때 로그를 출력
        if (courseLine.length > 0) {
            const newPolyline = new window.Tmapv2.Polyline({
                path: courseLine,
                strokeColor: "#6386BE",
                strokeWeight: 8,
                strokeOpacity: 100,
                map: map,
                draggable: false, //드래그 여부
                direction: true,
                directionColor: "white",
            });
            setPolyline(newPolyline);
        }

        // resultMarkerArr에 결과값이 있으면
        if (resultMarkerArr?.length > 0) {
            // 마커 그려주기
            resultMarkerArr.map((convertPoint) => {
                // console.log(convertPoint);
                const marker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(
                        convertPoint._lat,
                        convertPoint._lng,
                    ),
                    icon: waypointPin,
                    iconSize: new window.Tmapv2.Size(24, 24),
                    draggable: false,
                    opacity: 0,
                    visible: true,
                    map: map,
                });

                console.log(marker);
                marker.addListener(
                    "click",
                    function () {
                        if (!this._marker_data.options.draggable) {
                            console.log(
                                "애드리스너 테스트 - 클릭했을 때 드래거블이 false인 경우",
                                this,
                            );

                            // 마커 애니메이션 활성화를 위한 aniType
                            const aniType = marker.animate(
                                Tmapv2.MarkerOptions.ANIMATE_BOUNCE,
                            );

                            this._marker_data.options.draggable = true;
                            this._marker_data.options.animation = aniType;
                            this._marker_data.options.animationLength = 500;
                            console.log("애드리스너 변화 시킨 marker", this);
                            setSelectedMarker(this);
                        } else {
                            console.log(
                                "애드리스너 테스트 - 클릭했을 때 드래거블이 true인 경우",
                                this,
                            );
                            this._marker_data.options.draggable = false;

                            this.stopAnimation();

                            setSelectedMarker(null);
                        }
                    },
                    marker,
                );

                marker.addListener("dragstart", function () {
                    this.stopAnimation();
                });

                // 마커가 draggable 가능할 때에만 이벤트 리스너 달아주기
                if (marker._marker_data.options.draggable === true) {
                    marker.addListener("dragend", function () {
                        const newposition = marker.getPosition();
                        console.log("드래그 후 포지션", newposition);

                        // 코스 업데이트
                        const updatedCourse = filteredCourse.map(
                            (point, index) =>
                                index === selectedMarker
                                    ? {
                                          lat: newposition.lat(),
                                          lng: newposition.lng(),
                                      }
                                    : point,
                        );
                        setFilteredCourse(updatedCourse);
                        console.log("드래그 후 코스 업데이트", filteredCourse);
                    });

                    setMarkers((prev) => [...prev, marker]);
                }
            });
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
