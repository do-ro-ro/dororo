import { useState } from "react";

import Map from "./Map";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";
import RecommendButton from "./RecommendButton";
import OptionModal from "./OptionModal";
import React, { useEffect } from "react";
import axios from "axios";

const Main = () => {
    const [lat, setLat] = useState(37.501286);
    const [lng, setLng] = useState(127.0396029);

    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState("");

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const getKakaoMapAddress = async (latitude, longitude) => {
            const apiKey = import.meta.env.VITE_KAKAOMAP_REST_API_KEY; // 자신의 Kakao API 키로 대체하세요
            const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `KakaoAK ${apiKey}`,
                    },
                });

                const address = response.data.documents[0]?.address;
                if (address) {
                    setAddress(address.address_name);
                    return `${address.address_name} `;
                } else {
                    return "주소를 찾을 수 없습니다.";
                }
            } catch (error) {
                console.error("Error:", error);
                return "주소를 가져오는 중에 오류가 발생했습니다.";
            }
        };
        getKakaoMapAddress(lat, lng);
    }, [lat, lng]);

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
                        address={address}
                    />
                )}
            </div>
        </>
    );
};

export default Main;
