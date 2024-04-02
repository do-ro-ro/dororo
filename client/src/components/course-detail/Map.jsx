import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function Map({ course }) {
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

    // API 호출을 위한 세팅들
    const startPoint = currentCourse?.originMapRouteAxis[0];
    const endPoint =
        currentCourse?.originMapRouteAxis[
            currentCourse.originMapRouteAxis.length - 1
        ];

    // 코스정보를 받아왔을 때 웨이포인트는 보정 전 좌표로 등록하기
    // useEffect(() => {
    //     // 코스 정보를 받아오면
    // }, [currentCourse]);

    // 지도 시작점을 위한 센터 포인트 정의
    const centerPoint = {
        lat: (startPoint.lat + endPoint?.lat) / 2,
        lng: (startPoint?.lng + endPoint?.lng) / 2,
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
        if (currentCourse?.path.length > 0) {
            console.log("course path 좌표값", courseLine);
            currentCourse?.path.forEach((point) => {
                const convertedPoint = new window.Tmapv2.LatLng(
                    point.lat,
                    point.lng,
                );
                setCourseLine((prev) => [...prev, convertedPoint]);
            });

        }
    };

    useEffect(() => {
        if ()
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
    }, courseLine)

    // 마커 그리는 함수
    const drawMarkers = () => {
        if (courseNode?.length === 0) {
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
        console.log(currentCourse);
        if (map === null) {
            // 맵 생성하기
            initMap();
        }
    }, []);

    // initMap을 통해 map이 그려지면 발생하는 hook
    useEffect(() => {
        // 맵이 있는지 확인한 후에
        if (map !== null) {
            drawPolyline();
        }
    }, [map]);

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
