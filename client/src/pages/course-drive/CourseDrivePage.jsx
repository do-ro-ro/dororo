import { useState } from "react";
import RealTimeCurrentLocation from "../../components/course-drive/RealTimeCurrentLocation";
import Map from "./Map";

function CourseDrivePage() {
    const [lat, setLat] = useState(35.309216);
    const [lon, setLon] = useState(129.0633216);
    console.log(lat);
    console.log(lon);

    return (
        <>
            <RealTimeCurrentLocation setLat={setLat} setLon={setLon} />
            <Map lat={lat} lon={lon} />
        </>
    );
}

export default CourseDrivePage;
