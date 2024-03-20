import Map from "./Map";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";
import { useState } from "react";

function RecommendedCoursePage() {
    const [lat, setLat] = useState(37.5652045);
    const [lon, setLon] = useState(126.98702028);
    const [timestamp, setTimestamp] = useState();
    return (
        <div className="relative ">
            <Search setLat={setLat} setLon={setLon}></Search>
            <div className="relative ">
                {/* 지도에 대한 컨테이너 */}
                <Map lat={lat} lon={lon}></Map>
            </div>
            <div className="absolute top-24 right-0  m-4">
                {/* CurrentLocation의 위치를 지정 */}
                <CurrentLocation
                    setLat={setLat}
                    setLon={setLon}
                    setTimestamp={setTimestamp}
                ></CurrentLocation>
            </div>
        </div>
    );
}

export default RecommendedCoursePage;
