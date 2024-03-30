import { useState } from "react";

import Map from "./Map";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";
import RecommendButton from "./RecommendButton";
import OptionModal from "./OptionModal";

const Main = () => {
    const [lat, setLat] = useState(37.501286);
    const [lng, setLng] = useState(127.0396029);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <div>
                <Search setLat={setLat} setLng={setLng}></Search>
            </div>
            <div className="relative ">
                <Map lat={lat} lng={lng}></Map>
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 mb-2">
                    <RecommendButton openModal={openModal}></RecommendButton>
                </div>
            </div>
            <div className="absolute top-24 right-0  m-4">
                <CurrentLocation
                    setLat={setLat}
                    setLng={setLng}
                ></CurrentLocation>
            </div>
            <div>
                {showModal && (
                    <OptionModal
                        open={showModal}
                        closeModal={closeModal}
                        lat={lat}
                        lng={lng}
                    />
                )}
            </div>
        </>
    );
};

export default Main;
