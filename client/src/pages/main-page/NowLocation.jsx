import React, { useState, useEffect } from "react";

const NowLocation = ({ setLat, setLon }) => {
    const [location, setLocation] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        let watchId = null;

        const getLocation = () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        setLat(latitude);
                        setLon(longitude);
                    },
                    (error) => {
                        setError(error.message);
                    },
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
    }, [setLat, setLon]);

    return (
        <div>
            {location ? (
                <div>
                    <p>현재 위치:</p>
                    <p>위도: {location.latitude}</p>
                    <p>경도: {location.longitude}</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>위치 정보를 가져오는 중...</p>
            )}
        </div>
    );
};

export default NowLocation;
