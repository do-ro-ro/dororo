import { useState } from "react";
import RealTimeCurrentLocation from "../../components/course-drive/RealTimeCurrentLocation";
// import Map from "../../components/course-drive/Map";
import StopOver from "../../components/course-drive/StopOver";
import ServerTest from "../../components/course-drive/ServerTest";
import Topbar from "../../components/topbar/Topbar";
import { Button, Stack, Typography } from "@mui/material";
import Map from "../recommend-course/Map";
import IntroductionModal from "../../components/course-drive/IntroductionModal";

function CourseDrivePage() {
    const [lat, setLat] = useState(35.09504003528538);
    const [lng, setLng] = useState(128.90489491914798);
    const [coolList, setcoolList] = useState([{}]);
    const [fillterList, setFillterList] = useState([{}]);
    const [time, setTime] = useState(0);
    const [km, setKm] = useState(0);

    // 운행 시작 전 시작점 도달 여부 확인하는 상태
    // if 현재 위치 좌표 === StartPoint 노드 좌표 => setOnStartPoint(true)
    // 하는 로직 필요
    const [onStartPoint, setOnStartPoint] = useState(false);

    // 주행 진행중 여부 확인하는 상태
    // '운행 시작' 클릭 시 상태 전환
    const [isDriving, setIsDriving] = useState(false);
    // console.log(coolList);
    // console.log(fillterList);
    return (
        <>
            <IntroductionModal />
            <div className="relative">
                <RealTimeCurrentLocation setLat={setLat} setLon={setLng} />
                <ServerTest setcoolList={setcoolList} />
                {/* <Map lat={lat} lon={lon} /> */}
                <Topbar>코스 이름</Topbar>
                <StopOver
                    lat={lat}
                    lng={lng}
                    coolList={coolList}
                    fillterList={fillterList}
                    setFillterList={setFillterList}
                    setTime={setTime}
                    setKm={setKm}
                />
                {/* UI 테스트용 임시 맵 */}
                {/* <Map lat={lat} lon={lng} /> */}
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
                {/* <div>거리 : {km} km</div>
                <div>시간 : {time} 분</div> */}
            </div>
        </>
    );
}

export default CourseDrivePage;
