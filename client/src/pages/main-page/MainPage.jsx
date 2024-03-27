import { useState } from "react";

import Map from "./Map";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";
import RecommendButton from "./RecommendButton";
import OptionModal from "./OptionModal";

const MainPage = () => {
    const [lat, setLat] = useState(37.5652045);
    const [lon, setLon] = useState(126.98702028);
    const [timestamp, setTimestamp] = useState();

    const [option, setOption] = useState({
        method: "",
        length: 5,
        left: 1,
        right: 1,
        uturn: 1,
    });

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        console.log(option);
    };
    return (
        <>
            {/* <div className="relative "> */}
            <div>
                <Search setLat={setLat} setLon={setLon}></Search>
            </div>
            <div className="relative ">
                {/* 지도에 대한 컨테이너 */}
                <Map lat={lat} lon={lon}></Map>
                <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 mb-2">
                    <RecommendButton openModal={openModal}></RecommendButton>
                </div>
            </div>
            <div className="absolute top-24 right-0  m-4">
                {/* CurrentLocation의 위치를 지정 */}
                <CurrentLocation
                    setLat={setLat}
                    setLon={setLon}
                    setTimestamp={setTimestamp}
                ></CurrentLocation>
            </div>
            <div>
                {showModal && (
                    <OptionModal
                        open={showModal}
                        closeModal={closeModal}
                        setOption={setOption}
                        option={option}
                    />
                )}
            </div>
        </>
    );
};

export default MainPage;
