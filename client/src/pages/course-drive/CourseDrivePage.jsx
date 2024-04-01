import { useEffect, useState } from "react";
import RealTimeCurrentLocation from "../../components/course-drive/RealTimeCurrentLocation";
// import Map from "../../components/course-drive/Map";
import StopOver from "../../components/course-drive/StopOver";
import Topbar from "../../components/topbar/Topbar";
import { Button, Stack, Typography } from "@mui/material";
import IntroductionModal from "../../components/course-drive/IntroductionModal";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

function CourseDrivePage() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    // 35.095737617642946, 128.84941070168463
    const [lat, setLat] = useState(35.095737617642946);
    const [lng, setLng] = useState(128.90489491914798);

    // courseNode(오리지널 노드 좌표)
    const [courseNode, setCourseNode] = useState([]);
    // courseLine(보정된 노드 좌표)
    const [courseLine, setCourseLine] = useState([]);
    // 첫점과 끝점을 제외한 path 좌표
    const [filteredCourse, setFilteredCourse] = useState([]);

    const [time, setTime] = useState(0);
    const [km, setKm] = useState(0);

    // filteredCourse 배열의 길이만큼 false 값을 가진 배열 생성
    const visited = Array(filteredCourse.length).fill(false);

    // useState를 사용하여 배열 상태 생성

    // 시작 위치에 도착하면 운행 시작 버튼 활성화
    useEffect(() => {
        if (courseNode.length > 2) {
            let latPlus = courseNode[0].lat + 0.0003;
            let latMinus = courseNode[0].lat - 0.0003;
            let lngPlus = courseNode[0].lng + 0.0004;
            let lngMinus = courseNode[0].lng - 0.0004;

            let targetLat = lat; // 타겟 경도
            let targetLng = lng; // 타겟 위도
            if (targetLat >= latMinus && targetLat <= latPlus) {
                if (targetLng >= lngMinus && targetLng <= lngPlus) {
                    setOnStartPoint(true);
                } else {
                    setOnStartPoint(false);
                }
            } else {
                setOnStartPoint(false);
            }
        }
    }, [courseNode, lat, lng]);

    const location = useLocation();

    useEffect(() => {
        setCourseNode(location.state.originMapRouteAxis);
        setCourseLine(location.state.convertedRouteAxis);
    }, [location.state.originMapRouteAxis, location.state.convertedRouteAxis]);

    // 운행 시작 전 시작점 도달 여부 확인하는 상태
    // if 현재 위치 좌표 === StartPoint 노드 좌표 => setOnStartPoint(true)
    // 하는 로직 필요
    const [onStartPoint, setOnStartPoint] = useState(false);

    // 주행 진행중 여부 확인하는 상태
    // '운행 시작' 클릭 시 상태 전환
    const [isDriving, setIsDriving] = useState(false);

    return (
        <>
            <IntroductionModal />
            <div className="relative">
                <RealTimeCurrentLocation setLat={setLat} setLng={setLng} />
                {/* <ServerTest setcoolList={setcoolList} /> */}
                <Topbar>코스 이름</Topbar>
                <StopOver
                    lat={lat}
                    lng={lng}
                    courseNode={courseNode}
                    setCourseNode={setCourseNode}
                    courseLine={courseLine}
                    setCourseLine={setCourseLine}
                    filteredCourse={filteredCourse}
                    setFilteredCourse={setFilteredCourse}
                    visited={visited}
                    setTime={setTime}
                    setKm={setKm}
                />
                {/* UI 테스트용 임시 맵 */}
                <div className="fixed z-50 bottom-2 inset-x-0">
                    <Stack alignItems={"center"}>
                        {!isDriving ? (
                            <Button
                                variant="contained"
                                sx={{ width: "90vw", py: 1 }}
                                disabled={onStartPoint ? false : true}
                                onClick={() => setIsDriving(true)}
                            >
                                <Stack direction={"row"} alignItems={"center"}>
                                    <Typography variant="h4" sx={{ ml: 1 }}>
                                        운행 시작
                                    </Typography>
                                </Stack>
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                sx={{ width: "90vw", py: 1 }}
                                color="error"
                                onClick={() => navigate(`/course/${courseId}`)}
                            >
                                <Stack direction={"row"} alignItems={"center"}>
                                    <Typography variant="h4" sx={{ ml: 1 }}>
                                        운행 취소
                                    </Typography>
                                </Stack>
                            </Button>
                        )}
                    </Stack>
                </div>
                {/* <div>현재위치</div>
                {lat}
                <div></div>
                {lng}
                <div>머지됨?</div> */}
                {/* <div>거리 : {km} km</div>
                <div>시간 : {time} 분</div> */}
            </div>
        </>
    );
}

export default CourseDrivePage;
