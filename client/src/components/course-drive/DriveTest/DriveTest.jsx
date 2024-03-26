import { useState } from "react";
import CurrentLocationTest from "./CurrentLocationTest";
import StopOverTest from "./StopOverTest";

const DriveTest = () => {
    const [lat, setLat] = useState(35.09504003528538);
    const [lon, setLon] = useState(128.90489491914798);
    const [coolList, setcoolList] = useState([{}]);
    const [fillterList, setFillterList] = useState([{}]);
    const [time, setTime] = useState(0);
    const [km, setKm] = useState(0);
    return (
        <div>
            <CurrentLocationTest setLat={setLat} setLon={setLon} />
            <StopOverTest lat={lat} lon={lon} />

            <div>{lat}</div>
            <div>{lon}</div>
        </div>
    );
};

export default DriveTest;
