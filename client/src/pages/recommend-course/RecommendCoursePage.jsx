import Map from "../../components/map/Map";
import CurrentLocation from "../../components/map/CurrentLocation";
import { useState } from "react";

function RecommendedCoursePage() {
    const [lat, setLat] = useState(37.5652045);
    const [lon, setLon] = useState(126.98702028);
    const [timestamp, setTimestamp] = useState();
    return (
        <div>
            <Map lat={lat} lon={lon}></Map>
            <CurrentLocation
                setLat={setLat}
                setLon={setLon}
                setTimestamp={setTimestamp}
            ></CurrentLocation>
        </div>
    );
}

export default RecommendedCoursePage;
