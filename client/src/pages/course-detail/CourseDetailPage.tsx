import UseCurrentLocation from './map-test/UseCurrentLocation';
import MapTest from './map-test/MapTest';
import { useState } from 'react';
function CourseDetailPage() {
    const [lat, setLat] = useState(35.309216);
    const [lon, setLon] = useState(129.0633216);
    console.log(lat);
    console.log(lon);
    // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
    return (
        <div>
            <UseCurrentLocation setLat={setLat} setLon={setLon} />
            <MapTest lat={lat} lon={lon} />
        </div>
    );
}

export default CourseDetailPage;
