import React, { useState, useEffect } from "react";

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface Props {
    setLat: (lat: number) => void;
    setLon: (lon: number) => void;
}

const UseCurrentLocation: React.FC<Props> = ({ setLat, setLon }) => {
    const [location, setLocation] = useState<Coordinates>({ latitude: 0, longitude: 0 });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        setLat(latitude);
                        setLon(longitude);
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
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

export default UseCurrentLocation;