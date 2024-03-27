import { useState } from "react";
import CurrentLocationTest from "./CurrentLocationTest";
import StopOverTest from "./StopOverTest";

import CurrentLocationTest1 from "./GeoLocationTest/CurrentLocationTest1";
import CurrentLocationTest2 from "./GeoLocationTest/CurrentLocationTest2";
import CurrentLocationTest3 from "./GeoLocationTest/CurrentLocationTest3";
import CurrentLocationTest4 from "./GeoLocationTest/CurrentLocationTest4";
import CurrentLocationTest5 from "./GeoLocationTest/CurrentLocationTest5";
import { Sick } from "@mui/icons-material";

const DriveTest = () => {
    const [lat1, setLat1] = useState(35.09504003528538);
    const [lon1, setLon1] = useState(128.90489491914798);
    const [lat2, setLat2] = useState(35.09504003528538);
    const [lon2, setLon2] = useState(128.90489491914798);
    const [lat3, setLat3] = useState(35.09504003528538);
    const [lon3, setLon3] = useState(128.90489491914798);
    const [lat4, setLat4] = useState(35.09504003528538);
    const [lon4, setLon4] = useState(128.90489491914798);
    const [lat5, setLat5] = useState(35.09504003528538);
    const [lon5, setLon5] = useState(128.90489491914798);

    const [avgLat, setAvgLat] = useState(35.09504003528538);
    const [avgLon, setAvgLon] = useState(128.90489491914798);

    const [lat, setLat] = useState(35.09504003528538);
    const [lon, setLon] = useState(128.90489491914798);
    const [coolList, setcoolList] = useState([{}]);
    const [fillterList, setFillterList] = useState([{}]);
    const [time, setTime] = useState(0);
    const [km, setKm] = useState(0);

    const avg = () => {
        let sum = 0;
        sum += lat1 + lat2 + lat3 + lat4 + lat5;
        setAvgLat(sum);
        sum = 0;
        sum += lon1 + lon2 + lon3 + lon4 + lon5;
        setAvgLon(sum);
    };

    return (
        <div>
            <CurrentLocationTest setLat={setLat} setLon={setLon} />
            <CurrentLocationTest1 setLat1={setLat1} setLon1={setLon1} />
            <CurrentLocationTest2 setLat1={setLat2} setLon1={setLon2} />
            <CurrentLocationTest3 setLat1={setLat3} setLon1={setLon3} />
            <CurrentLocationTest4 setLat1={setLat4} setLon1={setLon4} />
            <CurrentLocationTest5 setLat1={setLat5} setLon1={setLon5} />

            <StopOverTest lat={lat} lon={lon} />

            <div>여기는 기존 좌표</div>
            <div>{lat}</div>
            <div>{lon}</div>
            <div>테스트 1번</div>
            <div>{lat1}</div>
            <div>{lon1}</div>
            <div>테스트 2번</div>
            <div>{lat2}</div>
            <div>{lon2}</div>
            <div>테스트 3번</div>
            <div>{lat3}</div>
            <div>{lon3}</div>
            <div>테스트 4번</div>
            <div>{lat4}</div>
            <div>{lon4}</div>
            <div>테스트 5번</div>
            <div>{lat5}</div>
            <div>{lon5}</div>
            <button
                onClick={() => {
                    avg();
                }}
            ></button>
            <div>여기는 평균</div>
            <div>{avgLat}</div>
            <div>{avgLon}</div>
        </div>
    );
};

export default DriveTest;
