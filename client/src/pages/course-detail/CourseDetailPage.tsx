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

    // courseId가 null인 경우를 처리
    if (!courseId) {
        return <p>코스 ID를 찾을 수 없습니다.</p>;
    }

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
        </>
    );
}

export default CourseDetailPage;
