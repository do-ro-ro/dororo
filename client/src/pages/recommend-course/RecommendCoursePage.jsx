import Map from "../../components/map/Map";
import CurrentLocation from "../../components/map/CurrentLocation";
import Search from "./Search";
import { useState } from "react";

function RecommendedCoursePage() {
    const [lat, setLat] = useState(37.5652045);
    const [lon, setLon] = useState(126.98702028);
    const [timestamp, setTimestamp] = useState();
    return (
        <div>
            <Search setLat={setLat} setLon={setLon}></Search>
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
