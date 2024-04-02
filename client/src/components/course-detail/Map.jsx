import { useEffect, useState } from "react";

function Map({ course, courseName, toSave }) {
    const currentCourse = course;

    // Tmap 객체 관리를 위한 상태
    const [map, setMap] = useState(null);
    const [polyline, setPolyline] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [distance, setDistance] = useState(null);

    // polyline을 그리기 위한 보정된 path(꼭지점) 좌표를 저장하는 리스트
    const [courseLine, setCourseLine] = useState([]);

    // 지도 위 거점을 찍기 위한 오리지널 노드 좌표를 저장하는 리스트
    const [courseNode, setCourseNode] = useState([]);

    // 경유지 찾기 API를 통해 그린 마커가 들어있는 배열
    const [resultMarkerArr, setResultMarkerArr] = useState([]);
    const [resultInfoArr, setResultInfoArr] = useState([]);

    // 저장을 위한 request 배열 상태
    const [courseSaveRequest, setCourseSaveRequest] = useState([]);
    const [saveButtonClicked, setSaveButtonClicked] = useState(false);

    // API 호출을 위한 세팅들
    const basicStartPoint = currentCourse?.originMapRouteAxis[0];
    const basicEndPoint =
        currentCourse?.originMapRouteAxis[
            currentCourse.originMapRouteAxis.length - 1
        ];

    // 코스정보를 받아왔을 때 웨이포인트는 보정 전 좌표로 등록하기
    useEffect(() => {
        // 코스 정보를 받아오면
    }, [currentCourse]);

    // 지도 시작점을 위한 센터 포인트 정의
    const centerPoint = {
        lat: (basicStartPoint.lat + basicEndPoint?.lat) / 2,
        lng: (basicStartPoint?.lng + basicEndPoint?.lng) / 2,
    };

    // 지도 초기화
    const initMap = () => {
        const newMap = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(centerPoint.lat, centerPoint.lng),

            // center: new window.Tmapv2.LatLng(lat, lon),

            width: "100vw",
            height: "95vh",
            zoom: 16,
        });

        setMap(newMap);
    };

    // 라인 그리는 함수
    const drawPolyline = () => {
        if (courseLine.length > 0) {
            console.log("course path 좌표값", courseLine);
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

            // console.log(resultInfoArr);
            // 폴리라인에 객체 저장
            setPolyline(newPolyline);
        }
    };

    // 마커 그리는 함수
    const drawMarkers = () => {
        // 오리지널 값으로 마커 그리기 위해 courseNode에 결과값이 있으면
        if (courseNode?.length > 0) {
            // 마커 그려주기
            courseNode.map((node, index) => {
                // console.log(convertPoint);
                const marker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(node.lat, node.lng),
                    icon: waypointPin,
                    iconSize: new window.Tmapv2.Size(24, 24),
                    draggable: false,
                    opacity: 0,
                    visible: true,
                    map: map,
                });

                // console.log(marker);
                marker.addListener(
                    "touchend",
                    function () {
                        if (!this._marker_data.options.draggable) {
                            // 마커 애니메이션 활성화를 위한 aniType
                            const aniType = marker.animate(
                                Tmapv2.MarkerOptions.ANIMATE_BOUNCE,
                            );

                            this.setDraggable(true);
                            // this.setIcon(waypointPinSelected);
                            this._marker_data.options.animation = aniType;
                            this._marker_data.options.animationLength = 500;
                            // console.log("애드리스너 변화 시킨 marker", this);
                        } else {
                            // 선택한 마커 인덱스 표기
                            this.setDraggable(false);
                            // this.setIcon(waypointPin);

                            this.stopAnimation();
                            const newposition = marker.getPosition();
                            setSelectedMarkerIndex(index);
                            setSelectedMarkerPosition(newposition);
                        }
                    },
                    marker,
                );
                setMarkers((prev) => [...prev, marker]);
            });
        }
    };

    // 맨 처음 컴포넌트 랜딩 시
    useEffect(() => {
        // console.log(currentCourse);
        console.log(course);
        if (course) {
            setFilteredCourse(
                currentCourse?.originMapRouteAxis.slice(
                    1,
                    currentCourse?.originMapRouteAxis.length - 1,
                ),
            );
        }
        // 맵이 없으면
        if (map === null) {
            // 맵 생성하기
            initMap();
        }
    }, []);

    // initMap을 통해 map이 그려지면 발생하는 hook
    useEffect(() => {
        // 맵이 있는지 확인한 후에
        if (map !== null) {
            // courseNode에 보정전 좌표값 넣어주기
            setCourseNode(currentCourse?.originMapRouteAxis);
            postRouteSequential30(basicAPIparam);
            // console.log(courseLine);
        }
    }, [map]);

    // API가 호출될 때마다 발생하는 useEffect
    useEffect(() => {
        // 정리
        if (polyline) {
            polyline.setMap(null);
        }

        // courseLine이 존재하면 (경유지 탐색을 돌고 난 후라면)
        drawPolyline();
        if (markers.length === 0) {
            drawMarkers();
        }
    }, [checkAPI]);

    // 마커에 이동이 발생해서, 기록된 selectedMarkerIndex에 변화가 발생한 경우
    useEffect(() => {
        markers[selectedMarkerIndex]?.setPosition(selectedMarkerPosition);

        // 옮긴 다음 변경된 markers 바탕으로 API 실행

        if (markers) {
            // 변경된 markers 기반의 param 세팅
            // console.log("변경된 마커들 집합", markers);
            const tempStartPoint = markers[0]?.getPosition();
            const tempEndPoint = markers[markers.length - 1]?.getPosition();
            const tempFilteredCourse = markers?.slice(1, markers.length - 1);
            const tempParam = {
                startName: "출발지",
                startX: `${tempStartPoint?._lng}`,
                startY: `${tempStartPoint?._lat}`,
                startTime: "202403201103",
                endName: "도착지",
                endX: `${tempEndPoint?._lng}`,
                endY: `${tempEndPoint?._lat}`,
                viaPoints: tempFilteredCourse?.map((point) => ({
                    viaPointId: `test${tempFilteredCourse?.indexOf(point) + 1}`,
                    viaPointName: `name${
                        tempFilteredCourse?.indexOf(point) + 1
                    }`,
                    viaX: `${point.getPosition()._lng}`,
                    viaY: `${point.getPosition()._lat}`,
                })),
                reqCoordType: "WGS84GEO",
                resCoordType: "EPSG3857",
                searchOption: "2",
            };
            // console.log(tempParam);
            postRouteSequential30(tempParam);

            // console.log("다시 코스 돌린 후 마커 배열", resultMarkerArr);
        }
    }, [selectedMarkerPosition]);

    // 모든 마커 삭제하는 함수
    const deleteMarkers = () => {
        if (markers.length > 0) {
            markers.map((marker) => marker.setMap(null));
        }
    };

    // 저장하는 함수
    useEffect(() => {
        // courseSaveRequest 상태가 변경될 때마다 호출되는 부분
        // console.log("저장하기 위한 좌표값들", courseSaveRequest);

        // 버튼 클릭 여부를 확인하여 API 호출
        if (saveButtonClicked) {
            // API 호출 로직
            const body = {
                request: {
                    originMapRouteAxis: courseSaveRequest,
                    convertedRouteAxis: courseSaveRequest,
                    mapDistance: distance,
                    mapName: courseName,
                    mapType: "CUSTOM",
                    path: resultInfoArr,
                },
            };
            console.log("리퀘스트 바디", body);
            saveCourse(body);
        }
    }, [courseSaveRequest, saveButtonClicked]);

    const saveCustomCourse = (arr) => {
        // 배열 (resultMarkerArr)이 존재한다면
        if (arr.length > 0) {
            console.log("저장 호출!");
            // 세이브를 위한 리퀘스트 상태 초기화
            setCourseSaveRequest([]);
            // 배열 돌면서
            arr.forEach((marker) => {
                const willBeSavedMarkerPosition = {
                    lat: marker._lat,
                    lng: marker._lng,
                };
                setCourseSaveRequest((prev) => [
                    ...prev,
                    willBeSavedMarkerPosition,
                ]);
            });

            // 버튼 클릭 여부 수정
            setSaveButtonClicked(true);
        }
    };

    useEffect(() => {
        saveCustomCourse(resultMarkerArr);
    }, [toSave]);

    return (
        <>
            <Box>
                {/* <Button onClick={handleUndo}>실행 취소</Button> */}
                <div id="map_div"></div>
                <Box position={"fixed"}>
                    {/* <Button onClick={() => saveCustomCourse(resultMarkerArr)}>
                      수정 완료
                  </Button> */}
                    {/* <Button onClick={handleReset}>리셋</Button> */}
                </Box>
            </Box>
        </>
    );
}

export default Map;
