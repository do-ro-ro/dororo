import React, { useState, useEffect } from "react";

const RealTimeCurrentLocation = ({ setLat, setLng }) => {
    const [location, setLocation] = useState();
    const [error, setError] = useState();
    const options = {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
    };
    출처: //7942yongdae.tistory.com/150 [개발자 일지:티스토리]
    https: useEffect(() => {
        let watchId = null;

        const getLocation = () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        setLat(latitude);
                        setLng(longitude);
                    },
                    (error) => {
                        setError(error.message);
                    },
                    options,
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        getLocation();

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [setLat, setLng]);

    return (
        <div>
            {location ? (
                <div>
                    {/* <p>현재 위치:</p> */}
                    {/* <p>위도: {location.latitude}</p> */}
                    {/* <p>경도: {location.longitude}</p> */}
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>위치 정보를 가져오는 중...</p>
            )}
        </div>
    );
};

export default RealTimeCurrentLocation;
