import { useEffect, useState } from "react";
import RealTimeCurrentLocation from "../../components/course-drive/RealTimeCurrentLocation";
// import Map from "../../components/course-drive/Map";
import StopOver from "../../components/course-drive/StopOver";
import ServerTest from "../../components/course-drive/ServerTest";
import Topbar from "../../components/topbar/Topbar";
import { Button, Stack, Typography } from "@mui/material";
import Map from "../main-page/Map";
import IntroductionModal from "../../components/course-drive/IntroductionModal";
import LocationTest1 from "../../components/course-drive/location-test/LocationTest1";
import LocationTest2 from "../../components/course-drive/location-test/LocationTest2";
import LocationTest3 from "../../components/course-drive/location-test/LocationTest3";
import LocationTest4 from "../../components/course-drive/location-test/LocationTest4";
import LocationTest5 from "../../components/course-drive/location-test/LocationTest5";
import LocationTest6 from "../../components/course-drive/location-test/LocationTest6";
import LocationTest7 from "../../components/course-drive/location-test/LocationTest7";
import LocationTest8 from "../../components/course-drive/location-test/LocationTest8";
import LocationTest9 from "../../components/course-drive/location-test/LocationTest9";
import LocationTest10 from "../../components/course-drive/location-test/LocationTest10";

import MapTest from "../../components/course-drive/location-test/MapTest";
import MapTest2 from "../../components/course-drive/location-test/MapTes2";
import MapTest3 from "../../components/course-drive/location-test/MapTest3";

import WatchPosition1 from "../../components/course-drive/watchposition/WatchPosiiton1";
import GoogleLocation from "../../components/course-drive/location-test/GoogleLocation";

function CourseDrivePage() {
    // 35.095737617642946, 128.84941070168463
    const [lat, setLat] = useState(35.095737617642946);
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
                <RealTimeCurrentLocation setLat={setLat} setLng={setLng} />
                <ServerTest setcoolList={setcoolList} />
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
