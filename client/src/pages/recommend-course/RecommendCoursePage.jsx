import { useState, useEffect } from "react";

import Topbar from "../../components/topbar/Topbar";
import Recommend from "./Recommend";
import BottomNav from "./BottomNav";
import { useLocation } from "react-router-dom";

function RecommendedCoursePage() {
    const [locations, setLocations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const optionData = useLocation(); // OptionModal에서 뿌린 데이터

    const [path, setPath] = useState([
        {
            lat: "",
            lng: "",
        },
    ]);

    const [distance, setDistance] = useState(0);

    useEffect(() => {
        console.log("path", path);
        console.log("distance", distance);
    }, [path, distance]);

    useEffect(() => {
        if (optionData.state && optionData.state.data) {
            setLocations(optionData.state.data);
        }
    }, [optionData.state, locations, currentIndex]);

    useEffect(() => {
        if (locations.length > 0) {
            const currentLocation = locations[currentIndex];
            setCourseNode(currentLocation.originMapRouteAxis);
            setCourseLine(currentLocation.convertedRouteAxis);
            const filtered = currentLocation.originMapRouteAxis.slice(1, -1);
            setFilteredCourse(filtered);
        }
    }, [locations, currentIndex]); // locations와 currentIndex가 변경될 때만 이 effect를 실행합니다.

    // originMapRouteAxis 좌표들
    const [courseNode, setCourseNode] = useState([]);
    // convertedRouteAxis 좌표들 폴리라인
    const [courseLine, setCourseLine] = useState([]);

    // 첫점 끝점 뺀 originMapRouteAxis 경유지
    const [filteredCourse, setFilteredCourse] = useState([]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, locations.length - 1),
        );
    };

    return (
        <div>
            <Topbar isQuitButton={true}>추천 코스 안내</Topbar>
            <BottomNav
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentIndex={currentIndex}
                locations={locations}
                location={locations[currentIndex]}
                path={path}
                distance={distance}
            ></BottomNav>
            {locations.length > 0 && (
                <Recommend
                    // location={locations[currentIndex]}
                    courseNode={courseNode}
                    courseLine={courseLine}
                    filteredCourse={filteredCourse}
                    currentIndex={currentIndex}
                    setPath={setPath}
                    setDistance={setDistance}
                ></Recommend>
            )}
        </div>
    );
}

export default RecommendedCoursePage;
