import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Recommend from "./Recommend";
import BottomNav from "./BottomNav";

function RecommendedCoursePage() {
    const [locations, setLocation] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios
            .get(
                "https://ccd8f72d-f344-4e8d-8ee0-579f9c938880.mock.pstmn.io/maps",
            )
            .then((res) => {
                setLocation(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
            <Topbar>추천 코스 안내</Topbar>
            <BottomNav
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentIndex={currentIndex}
                locations={locations}
            ></BottomNav>
            {locations.length > 0 && (
                <Recommend
                    locations={locations[currentIndex]}
                    currentIndex={currentIndex}
                ></Recommend>
            )}
        </div>
    );
}

export default RecommendedCoursePage;
