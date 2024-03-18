import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import UseCurrentLocation from "./map-test/UseCurrentLocation";
import MapTest from "./map-test/MapTest";

function CourseDetailPage() {
    const [lat, setLat] = useState<number>(35.309216);
    const [lon, setLon] = useState<number>(129.0633216);
    const { courseId } = useParams();
    const navigate = useNavigate();
    console.log(lat);
    console.log(lon);
    // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.

    const handleCustomClick = () => {
        navigate(`/course/${courseId}/custom`);
    };

    return (
        <>
            <p>코스 조회 페이지</p>
            <div>
                <UseCurrentLocation setLat={setLat} setLon={setLon} />
                <MapTest lat={lat} lon={lon} />
            </div>
            <button onClick={() => navigate(`/course/${courseId}/drive`)}>
                주행하기
            </button>
            <button onClick={handleCustomClick}>코스 커스텀</button>
        </>
    );
}

export default CourseDetailPage;
