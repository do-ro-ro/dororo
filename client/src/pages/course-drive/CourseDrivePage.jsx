import { useState } from "react";
import RealTimeCurrentLocation from "../../components/course-drive/RealTimeCurrentLocation";
// import Map from "../../components/course-drive/Map";
import StopOver from "../../components/course-drive/StopOver";
import ServerTest from "../../components/course-drive/ServerTest";

function CourseDrivePage() {
    const [lat, setLat] = useState(35.309216);
    const [lng, setLng] = useState(129.0633216);
    const [coolList, setcoolList] = useState([{}]);
    const [fillterList, setFillterList] = useState([{}]);
    // console.log(coolList);
    // console.log(fillterList);
    return (
        <>
            <RealTimeCurrentLocation setLat={setLat} setLon={setLng} />
            <ServerTest setcoolList={setcoolList} />
            {/* <Map lat={lat} lon={lon} /> */}

            <StopOver
                lat={lat}
                lng={lng}
                coolList={coolList}
                fillterList={fillterList}
                setFillterList={setFillterList}
            />
        </>
    );
}

export default CourseDrivePage;
