import { useState } from "react";

import Map from "./Map";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";
import RecommendButton from "./RecommendButton";
import OptionModal from "./OptionModal";

const Main = () => {
    const [lat, setLat] = useState(37.501286);
    const [lng, setLng] = useState(127.0396029);
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
            <div>
                <Search setLat={setLat} setLng={setLng}></Search>
            </div>
            <div className="relative ">
                <Map lat={lat} lng={lgn}></Map>
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 mb-2">
                    <RecommendButton openModal={openModal}></RecommendButton>
                </div>
            </div>
            <div className="absolute top-24 right-0  m-4">
                <CurrentLocation
                    setLat={setLat}
                    setLng={setLng}
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

export default Main;
