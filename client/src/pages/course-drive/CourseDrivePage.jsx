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

    const [lat1, setLat1] = useState(35.095737617642946);
    const [lng1, setLng1] = useState(128.84941070168463);

    const [lat2, setLat2] = useState(35.095737617642946);
    const [lng2, setLng2] = useState(128.84941070168463);

    const [lat3, setLat3] = useState(35.095737617642946);
    const [lng3, setLng3] = useState(128.84941070168463);

    const [lat4, setLat4] = useState(35.095737617642946);
    const [lng4, setLng4] = useState(128.84941070168463);

    const [lat5, setLat5] = useState(35.095737617642946);
    const [lng5, setLng5] = useState(128.84941070168463);

    const [lat6, setLat6] = useState(35.095737617642946);
    const [lng6, setLng6] = useState(128.84941070168463);

    const [lat7, setLat7] = useState(35.095737617642946);
    const [lng7, setLng7] = useState(128.84941070168463);

    const [lat8, setLat8] = useState(35.095737617642946);
    const [lng8, setLng8] = useState(128.84941070168463);

    const [lat9, setLat9] = useState(35.095737617642946);
    const [lng9, setLng9] = useState(128.84941070168463);

    const [lat10, setLat10] = useState(35.095737617642946);
    const [lng10, setLng10] = useState(128.84941070168463);

    const [watchLat1, setWatchLat1] = useState(35.095737617642946);
    const [watchLng1, setWatchLng1] = useState(128.84941070168463);

    const [googleLat, setGoogleLat] = useState(35.095737617642946);
    const [googleLng, setGoogleLng] = useState(128.84941070168463);

    // 운행 시작 전 시작점 도달 여부 확인하는 상태
    // if 현재 위치 좌표 === StartPoint 노드 좌표 => setOnStartPoint(true)
    // 하는 로직 필요
    const [onStartPoint, setOnStartPoint] = useState(false);

    // 주행 진행중 여부 확인하는 상태
    // '운행 시작' 클릭 시 상태 전환
    const [isDriving, setIsDriving] = useState(false);
    // console.log(coolList);
    // console.log(fillterList);

    useEffect(() => {
        let a =
            lat1 +
            lat2 +
            lat3 +
            lat4 +
            lat5 +
            lat6 +
            lat7 +
            lat8 +
            lat9 +
            lat10;
        let b = a / 10;
        setLat(b);

        let c =
            lng1 +
            lng2 +
            lng3 +
            lng4 +
            lng5 +
            lng6 +
            lng7 +
            lng8 +
            lng9 +
            lng10;
        let d = c / 10;
        setLng(d);
    }, [lat1, lat2, lat3, lat4, lat5, lat6, lat7, lat8, lat9, lat10]);

    return (
        <>
            <IntroductionModal />
            <div className="relative">
                <LocationTest1 setLat1={setLat1} setLng1={setLng1} />
                <LocationTest2 setLat2={setLat2} setLng2={setLng2} />
                <LocationTest3 setLat3={setLat3} setLng3={setLng3} />
                <LocationTest4 setLat4={setLat4} setLng4={setLng4} />
                <LocationTest5 setLat5={setLat5} setLng5={setLng5} />
                <LocationTest6 setLat6={setLat6} setLng6={setLng6} />
                <LocationTest7 setLat7={setLat7} setLng7={setLng7} />
                <LocationTest8 setLat8={setLat8} setLng8={setLng8} />
                <LocationTest9 setLat9={setLat9} setLng9={setLng9} />
                <LocationTest10 setLat10={setLat10} setLng10={setLng10} />
                <WatchPosition1
                    setWatchLat1={setWatchLat1}
                    setWatchLng1={setWatchLng1}
                />
                <GoogleLocation
                    setGoogleLat={setGoogleLat}
                    setGoogleLng={setGoogleLng}
                />
                {/* <RealTimeCurrentLocation setLat={setLat} setLng={setLng} /> */}
                {/* <ServerTest setcoolList={setcoolList} /> */}
                {/* <Map lat={lat} lon={lon} /> */}
                <Topbar>코스 이름</Topbar>
                {/* <MapTest lat={lat} lng={lng} /> */}
                <MapTest2 watchLat1={watchLat1} watchLng1={watchLng1} />
                <MapTest3 googleLat={googleLat} googleLng={googleLng} />
                {/* <StopOver
                    lat={lat}
                    lng={lng}
                    coolList={coolList}
                    fillterList={fillterList}
                    setFillterList={setFillterList}
                    setTime={setTime}
                    setKm={setKm}
                /> */}
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
