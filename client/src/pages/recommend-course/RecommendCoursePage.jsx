import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Recommend from "./Recommend";
import BottomNav from "./BottomNav";
import { useLocation } from "react-router-dom";

function RecommendedCoursePage() {
    const [courseNode, setCourseNode] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const optionData = useLocation(); // OptionModal에서 뿌린 데이터

    useEffect(() => {
        if (optionData.state && optionData.state.data) {
            setCourseNode(optionData.state.data);
        }
    }, [optionData.state]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, courseNode.length - 1),
        );
    };

    return (
        <div>
            <Topbar>추천 코스 안내</Topbar>
            <BottomNav
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentIndex={currentIndex}
                courseNode={courseNode}
            ></BottomNav>
            {courseNode.length > 0 && (
                <Recommend
                    courseNode={courseNode[currentIndex]}
                    currentIndex={currentIndex}
                ></Recommend>
            )}
        </div>
    );
}

export default RecommendedCoursePage;
