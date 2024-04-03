import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import startPin from "../../assets/map_marker_start.png";
import endPin from "../../assets/map_marker_end.png";
import wayPointPin from "../../assets/waypoint_yet.png";
import RoadViewModal from "../../pages/recommend-course/RoadViewModal";
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

function Map({ course, variant }) {
    const currentCourse = course;

    // Tmap 객체 관리를 위한 상태
    const [map, setMap] = useState(null);
    const [polyline, setPolyline] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [distance, setDistance] = useState(null);

    // polyline을 그리기 위한 보정된 path(꼭지점) 좌표를 저장하는 리스트
    const [courseLine, setCourseLine] = useState([]);
    const [tempCourseLine, setTempCourseLine] = useState([]);

    //웨이포인트 아이콘을 저장하는 리스트
    const wayPointIcons = [
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
    // 지도 위 거점을 찍기 위한 오리지널 노드 좌표를 저장하는 리스트
    const [courseNode, setCourseNode] = useState([]);

    // API 호출을 위한 세팅들
    const startPoint = currentCourse?.originMapRouteAxis[0];
    const endPoint =
        currentCourse?.originMapRouteAxis[
            currentCourse.originMapRouteAxis.length - 1
        ];

    // 로드뷰 모달을 위한 함수들
    const [currentLocation, setCurrentLocation] = useState({
        lat: null,
        lng: null,
    });
    const [showRoadViewModal, setShowRoadViewModal] = useState(false);

    const openRoadViewModal = (lat, lng) => {
        setCurrentLocation({ lat, lng });
        setShowRoadViewModal(true);
    };

    const closeRoadViewModal = () => {
        setShowRoadViewModal(false);
    };

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
            height: variant === "post" ? "50vh" : "70vh",
            zoom: 16,
        });

        setMap(newMap);
    };

    // 라인 그리는 함수
    const drawPolyline = () => {
        if (courseLine?.length > 0) {
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
            console.log("폴리라인", newPolyline);
        }
    };

    // 마커 그리는 함수
    const drawMarkers = () => {
        let icon = "";
        let iconSize = "";
        if (courseNode?.length > 0) {
            // 마커 그려주기
            courseNode.map((node, index) => {
                // console.log(convertPoint);
                const nodeIndex = index;
                // console.log(nodeIndex);
                if (index === 0) {
                    icon = startPin;
                    iconSize = new window.Tmapv2.Size(36, 57);
                } else if (index === courseNode.length - 1) {
                    icon = endPin;
                    iconSize = new window.Tmapv2.Size(36, 57);
                } else {
                    icon = wayPointIcons[index - 1];
                    iconSize = new window.Tmapv2.Size(24, 24);
                }
                const marker = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(node.lat, node.lng),
                    // icon: {nodeIndex === 0 ? startPin : waypointPin},
                    icon: icon,
                    iconSize: iconSize,
                    draggable: false,
                    opacity: 0,
                    visible: true,
                    map: map,
                });

                // console.log(marker);
                marker.addListener(
                    "touchend",
                    () => {
                        openRoadViewModal(node.lat, node.lng);
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

        // currentCourse 받아왔으니, 있으면
        if (currentCourse?.path.length > 0) {
            currentCourse?.path.forEach((point) => {
                const convertedPoint = new window.Tmapv2.LatLng(
                    point.lat,
                    point.lng,
                );
                // console.log("컨버트한 점", convertedPoint);
                setTempCourseLine((prev) => [...prev, convertedPoint]);
            });
        }
        if (map === null) {
            // 맵 생성하기
            initMap();
        }
    }, []);

    useEffect(() => {
        // console.log("임시 코스라인", tempCourseLine);
        setCourseLine(tempCourseLine);
        setCourseNode(currentCourse?.originMapRouteAxis);
    }, [map]);

    // initMap을 통해 map이 그려지면 발생하는 hook
    useEffect(() => {
        // 맵이 있는지 확인한 후에
        console.log("코스 노드", courseNode);
        if (map !== null) {
            drawPolyline();
            drawMarkers();
        }
    }, [courseLine]);

    return (
        <>
            <div id="map_div"></div>
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
        </>
    );
}

export default Map;
