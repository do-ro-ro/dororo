import { useState } from "react";
import RealTimeCurrentLocation from "../../components/course-drive/RealTimeCurrentLocation";

function CourseDrivePage() {
    const [lat, setLat] = useState(35.309216);
    const [lon, setLon] = useState(129.0633216);
    console.log(lat);
    console.log(lon);

    return (
        <>
            <RealTimeCurrentLocation setLat={setLat} setLon={setLon} />
        </>
    );
}

export default CourseDrivePage;
